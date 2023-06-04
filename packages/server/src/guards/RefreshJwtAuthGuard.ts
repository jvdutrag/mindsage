import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class RefreshJwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest() as Request

    if (!request.cookies['auth']) {
        throw new BadRequestException('Refresh Token Not Found')
    }

    return true
  }
}
