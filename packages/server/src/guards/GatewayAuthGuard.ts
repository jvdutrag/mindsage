import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { AuthService } from '../services'

@Injectable()
export class GatewayAuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const client: Socket = context.switchToWs().getClient<Socket>()
            const authToken: string = client.handshake.headers.authorization.split(' ')[1]

            const user = await this.authService.verify(authToken)

            client.data.user = user
    
            return Boolean(user)
        } catch (err) {
            throw new WsException(err.message)
        }
    }
}
