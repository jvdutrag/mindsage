import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserToken } from '../models'

@Injectable()
export class UserTokenService {
    constructor(
        @InjectRepository(UserToken)
        private userTokenRepository: Repository<UserToken>
    ) {}

    async findOne(value: string): Promise<UserToken> {
        const token = await this.userTokenRepository.findOne({
            where: {
                value
            },
            relations: ['user']
        })

        if (!token) {
            return null
        }

        if (token.expires_at < new Date()) {
            await this.remove(token)
            return null
        }

        return token
    }

    async remove(token: UserToken): Promise<void> {
        await this.userTokenRepository.remove(token)
    }

    async save(token: UserToken): Promise<UserToken> {
        return this.userTokenRepository.save(token)
    }
}
