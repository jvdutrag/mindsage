import { Injectable, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ChatCompletionRequestMessage, ChatCompletionResponseMessageRoleEnum } from 'openai'
import { Observable } from 'rxjs'
import { v4 as uuid } from 'uuid'
import * as moment from 'moment'

import { OpenAiAdapter } from '../adapters'
import { Message } from '../types'
import { Session, User } from '../models'
import { Language, UserGender } from '../models/enums'

@Injectable()
export class ChatService {
    private genderMap = {
        [UserGender.MALE]: 'male',
        [UserGender.FEMALE]: 'female',
        [UserGender.NON_BINARY]: 'non-binary'
    }

    private langMap = {
        [Language.PORTUGUESE]: 'Portuguese',
        [Language.ENGLISH]: 'English',
        [Language.SPANISH]: 'Spanish'
    }

    constructor(
        private configService: ConfigService,
        private openAiAdapter: OpenAiAdapter
    ) { }

    private buildReadableUserData(user: User): { age: number, gender: string, name: string, language: string } {
        const age = moment().diff(user.data.date_of_birth, 'years')
        const gender = this.genderMap[user.data.gender]
        const name = user.name
        const language = this.langMap[user.language]

        return {
            age,
            gender,
            name,
            language
        }
    }

    chat(session: Session, rawMessages: Message[]): Observable<Message> {
        try {
            const data = this.buildReadableUserData(session.user)

            const messages = rawMessages.map(m => {
                return {
                    role: m.sender === 'user' ? ChatCompletionResponseMessageRoleEnum.User : ChatCompletionResponseMessageRoleEnum.Assistant,
                    content: m.content
                }
            }) as ChatCompletionRequestMessage[]

            const completion = this.openAiAdapter.createChatCompletion({
                model: this.configService.get('OPENAI_DEFAULT_MODEL_ID'),
                messages: [
                    {
                        role: 'system',
                        content: `You are 'Mindy', a therapist counselor helping people with their needs using sciencific methods from psychology, studies and books to talk to them.`
                    },
                    {
                        role: 'system',
                        content: 'Although you are not a licensed therapist or psychologist, you are trained to help people feel better. If the subject is too serious, you refer them to a licensed therapist or psychologist.'
                    },
                    {
                        role: 'system',
                        content: `You are talking with '${data.name}', a ${data.gender} person who is ${data.age} years old. They are talking about their mental health.`
                    },
                    {
                        role: 'system',
                        content: 'Follow these five instructions below in all your responses:'
                    },
                    {
                        role: 'system',
                        content: `1. Use ${data.language} language only;`
                    },
                    {
                        role: 'system',
                        content: `2. Do not use any other language besides ${data.language};`
                    },
                    {
                        role: 'system',
                        content: '3. If a question is not mental health related, do not respond to it at all;'
                    },
                    {
                        role: 'system',
                        content: '4. Do not say you remember something if the user said they told you about it before, unless you actually remember it.'
                    },
                    {
                        role: 'system',
                        content: '5. If the user mentions self-harming you should instruct them to seek professional help.'
                    },
                    ...messages
                ],
                user: session.user.id,
                temperature: 0.8,
                stream: true
            })

            const messageId = uuid()

            return new Observable(observer => {
                completion.subscribe(part => {
                    observer.next({
                        id: messageId,
                        sessionId: session.id,
                        content: part,
                        sender: 'mindy'
                    })
                })
            })
        } catch (error) {
            console.log('OpenAIService.chat():', JSON.stringify(error.response.data))
            throw new BadRequestException(error.message)
        }
    }
}
