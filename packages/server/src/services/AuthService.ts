import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

import { User, UserData, UserToken } from '../models'
import { AuthResponse } from '../types'
import { accessTokenExpiration } from '../configs'
import { BusinessRuleException } from '../exceptions'
import { AuthDto } from '../dtos'

import { UserService } from './UserService'
import { UserTokenService } from './UserTokenService'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private userTokenService: UserTokenService,
        private configService: ConfigService
    ) { }

    async refresh(refreshToken: string): Promise<AuthResponse> {
        try {
            const decoded = await this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET')
            })

            if (typeof decoded === 'string') {
                throw new Error()
            }
        } catch (error) {
            throw new BusinessRuleException('Invalid Refresh Token', 'INVALID_REFRESH_TOKEN_1')
        }

        const token = await this.userTokenService.findOne(refreshToken)

        if (!token) {
            throw new BusinessRuleException('Invalid Refresh Token', 'INVALID_REFRESH_TOKEN_2')
        }

        const user = await this.userService.findById(token.user.id)

        if (!user) {
            throw new NotFoundException('User Not Found')
        }

        const payload = {
            sub: token.user.id
        }

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: accessTokenExpiration
        })

        return {
            accessToken,
            user
        }
    }

    async logout(refreshToken: string): Promise<void> {
        const token = await this.userTokenService.findOne(refreshToken)

        if (!token) {
            throw new NotFoundException('Invalid Refresh Token')
        }

        await this.userTokenService.remove(token)
    }

    async login(dto: AuthDto, ip: string, userAgent: string): Promise<AuthResponse> {
        try {
            const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${dto.accessToken}`
                }
            })

            let user = await this.userService.findByEmail(data.email)

            if (!user) {
                user = new User()
                user.email = data.email
                user.provider = 'google'
                user.language = dto.lang
                user = await this.userService.save(user)
            }

            const payload = {
                sub: user.id
            }

            const accessToken = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: accessTokenExpiration
            })

            const refreshToken = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET')
            })

            const token = new UserToken()

            token.user = user
            token.user_agent = userAgent
            token.user_ip_address = ip
            token.value = refreshToken

            await this.userTokenService.save(token)

            return {
                accessToken,
                refreshToken,
                user
            }
        } catch (error) {
            console.log('AuthService.login()', error)
            throw new BadRequestException('Error while trying to login')
        }
    }

    async verify(token: string): Promise<User> {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_ACCESS_SECRET')
            })

            if (typeof decoded === 'string') {
                throw new Error()
            }

            const userId = decoded.sub

            const user = await this.userService.findById(userId)

            return user
        } catch (error) {
            return null
        }
    }
}