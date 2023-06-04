import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'

import { Session, User } from '../models'

@Injectable()
export class SessionService {
    private relations = ['user', 'user.data']

    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>
    ) {}

    async findById(id: string, validate = false): Promise<Session> {
        const session = await this.sessionRepository.findOne({
            where: {
                id
            },
            relations: this.relations
        })

        if (!session) {
            throw new NotFoundException('Session not found')
        }

        if (validate && session.ended_at) {
            throw new Error('Session already ended')
        }

        return session
    }

    async findByUser(userId: string): Promise<Session[]> {
        const sessions = await this.sessionRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: this.relations
        })

        return sessions
    }

    async start(user: User): Promise<Session> {
        const session = new Session()
        session.user = user

        return this.sessionRepository.save(session)
    }

    async end(id: string): Promise<void> {
        const session = await this.findById(id)
        session.ended_at = new Date()
        await this.sessionRepository.save(session)
    }
}
