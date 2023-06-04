import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as moment from 'moment'

import { User, UserData } from '../models'
import { UserUpdateDto } from '../dtos'

@Injectable()
export class UserService {
    private relations = ['data']

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(UserData)
        private userDataRepository: Repository<UserData>
    ) {}

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: this.relations
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async save(user: User): Promise<User> {
        const saved = await this.userRepository.save(user)

        return saved
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                email
            },
            relations: this.relations
        })
    }

    async update(id: string, dto: UserUpdateDto): Promise<User> {
        const user = await this.findById(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        if (!user.data) {
            user.data = new UserData()
        }

        user.data.gender = dto.gender
        user.data.date_of_birth = moment(dto.dob).format('YYYY-MM-DD')
        user.name = dto.name
        user.language = dto.lang

        await this.save(user)

        return user
    }

    async delete(id: string): Promise<void> {
        const user = await this.findById(id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        await this.userRepository.delete(user.id)

        if (user.data) {
            await this.userDataRepository.delete(user.data.id)
        }
    }
}
