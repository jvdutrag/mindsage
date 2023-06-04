import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
    CreateChatCompletionRequest, CreateChatCompletionResponse,
    CreateCompletionResponseChoicesInner, ChatCompletionRequestMessageRoleEnum
} from 'openai'
import { Observable } from 'rxjs'
import got from 'got'

type Delta = {
    role: ChatCompletionRequestMessageRoleEnum,
    content: string
}

type Choice = CreateCompletionResponseChoicesInner & {
    delta: Delta
}

type ChatCompletionResponse = CreateChatCompletionResponse & {
    choices: Choice[]
}

@Injectable()
export class OpenAiAdapter {
    constructor(private configService: ConfigService) { }

    createChatCompletion(request: CreateChatCompletionRequest): Observable<string> {
        return new Observable(observer => {
            const stream = got.stream('https://api.openai.com/v1/chat/completions', {
                headers: {
                    Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
                },
                json: {
                    ...request
                },
                method: 'POST'
            })

            stream.on('data', (chunk) => {
                const body = chunk.toString()
    
                for (const message of body.split('\n')) {
                    if (!message) {
                        continue
                    }
    
                    if (!message.startsWith('data: ')) {
                        continue
                    }
    
                    // End of Data Stream
                    if (message === 'data: [DONE]') {
                        observer.next('[DONE]')
                        continue
                    }
    
                    const json = JSON.parse(message.toString().slice('data: '.length)) as ChatCompletionResponse
    
                    for (const choice of json.choices) {
                        const content = choice.delta.content

                        if (content) {
                            observer.next(content)
                        }
                    }
                }
            })
    
            stream.on('error', (error) => {
                observer.error(error)
            })
    
            stream.on('end', () => {
                observer.complete()
            })

            return () => {
                stream.destroy()
            }
        })
    }
}
