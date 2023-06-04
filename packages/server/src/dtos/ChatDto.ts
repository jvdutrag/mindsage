import { IsArray, IsNotEmpty } from 'class-validator'

import { Message } from '../types'

export class ChatDto {
    @IsArray()
    @IsNotEmpty()
    messages: Message[]
}
