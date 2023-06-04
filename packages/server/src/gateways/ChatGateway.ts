import { UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import {
    MessageBody, SubscribeMessage, WebSocketGateway,
    ConnectedSocket, OnGatewayConnection, WebSocketServer
} from '@nestjs/websockets'
import { Socket, Namespace } from 'socket.io'

import { AuthService, ChatService, SessionService } from '../services'
import { GatewayAuthGuard } from '../guards'
import { User } from '../models'
import { Message } from '../types'

type ChatPayload = {
    messages: Message[]
}

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:5000', 'https://mindsage.app']
    },
    namespace: 'chat'
})
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Namespace

    constructor(
        private authService: AuthService,
        private sessionService: SessionService,
        private chatService: ChatService
    ) { }

    private joinRoom(client: Socket, room: string) {
        for (const room of client.rooms) {
            client.leave(room)
        }

        client.join(room)
    }

    async handleConnection(client: Socket) {
        const token = client.handshake.headers.authorization.split(' ')[1]

        const user = await this.authService.verify(token)

        if (!user) {
            client.disconnect(true)
            return
        }

        client.on('disconnecting', async (reason) => { // Before Disconnect
            if (reason === 'transport close') { // Page Refresh or Quit
                const updatedClient = this.server.sockets.get(client.id)
                
                const sessionId = Array.from(updatedClient.rooms)[0]
                
                if (sessionId) {
                    await this.sessionService.end(sessionId).catch(err => console.log(`[Socket Error] disconnecting(): ${JSON.stringify(err)}`))
                }
            }
        })
    }

    @UseGuards(GatewayAuthGuard)
    @SubscribeMessage('chat:end')
    async handleChatEnd(@ConnectedSocket() client: Socket): Promise<void> {
        const sessionId = Array.from(client.rooms)[0]
        client.leave(sessionId)

        await this.sessionService.end(sessionId)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(GatewayAuthGuard)
    @SubscribeMessage('chat:resume')
    async handleChatResume(@ConnectedSocket() client: Socket, @MessageBody() sessionId: string): Promise<void> {
        try {
            const session = await this.sessionService.findById(sessionId, true)

            this.joinRoom(client, session.id)
        } catch(err) {
            console.log(`[Socket Error] handleChatResume(): ${JSON.stringify(err)}`)
            client.emit('feedback', { type: 'resume-error' })
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(GatewayAuthGuard)
    @SubscribeMessage('chat:start')
    async handleChatStart(@ConnectedSocket() client: Socket): Promise<void> {
        try {
            const user = client.data.user as User

            const session = await this.sessionService.start(user)

            this.joinRoom(client, session.id)

            client.emit('chat:started', session)
        } catch(err) {
            console.log(`[Socket Error] handleChatStart(): ${JSON.stringify(err)}`)
            client.emit('feedback', { type: 'start-error' })
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(GatewayAuthGuard)
    @SubscribeMessage('chat:message')
    async handleChatMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: ChatPayload): Promise<void> {
        try {
            const sessionId = Array.from(client.rooms)[0]

            const session = await this.sessionService.findById(sessionId)

            const chat = this.chatService.chat(session, payload.messages)

            chat.subscribe(message => {
                const isDone = message.content === '[DONE]'

                if (isDone) {
                    client.emit('feedback', { type: 'message-done' })
                    return
                }

                client.to(session.id).emit('chat:typing', message)
            })
        } catch(err) {
            console.log(`[Socket Error] handleChatMessage(): ${JSON.stringify(err)}`)
            client.emit('feedback', { type: 'message-error' })
        }
    }

}
