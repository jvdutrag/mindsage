import {
    Controller, UseGuards, Body,
    Req, Get, Put, Delete,
    UseInterceptors, ClassSerializerInterceptor
} from '@nestjs/common'
import { JwtAuthGuard } from '../guards'

import { UserUpdateDto } from '../dtos'
import { UserService } from '../services'
import { Request } from '../types'
import { User } from '../models'

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delete(@Req() req: Request): Promise<void> {
        const userId = req.user.id

        await this.userService.delete(userId)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Put('update')
    update(@Req() req: Request, @Body() dto: UserUpdateDto): Promise<User> {
        const userId = req.user.id

        return this.userService.update(userId, dto)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get()
    get(@Req() req: Request): Promise<User> {
        const userId = req.user.id

        return this.userService.findById(userId)
    }
}
