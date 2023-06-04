import { Controller, Req, Post, UseGuards, Res, Body, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { Response, CookieOptions } from 'express'
import { RealIP } from 'nestjs-real-ip'

import { RefreshJwtAuthGuard } from '../guards'
import { AuthService } from '../services'
import { Request, AuthResponse } from '../types'
import { AuthDto } from '../dtos'
import { cookieExpirationInDays } from '../configs'

@Controller('auth')
export class AuthController {
    private cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * cookieExpirationInDays
    }

    constructor(
        private authService: AuthService
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(
        @Res({ passthrough: true }) res: Response, @Req() req: Request,
        @Body() dto: AuthDto, @RealIP() ip: string
    ): Promise<AuthResponse> {
        const userAgent = req.headers['user-agent']

        const data = await this.authService.login(dto, ip, userAgent)

        res.cookie('auth', data.refreshToken, this.cookieOptions)

        return {
            accessToken: data.accessToken,
            user: data.user
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    async refresh(@Req() req: Request): Promise<AuthResponse> {
        const refreshToken = req.cookies['auth']

        const data = await this.authService.refresh(refreshToken)

        return {
            accessToken: data.accessToken,
            user: data.user
        }
    }

    @UseGuards(RefreshJwtAuthGuard)
    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
        const refreshToken = req.cookies['auth']

        await this.authService.logout(refreshToken)
        res.clearCookie('auth', this.cookieOptions)
    }

}
