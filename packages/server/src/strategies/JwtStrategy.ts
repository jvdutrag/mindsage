import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

type DecodedJwt = {
    sub: string
    iat: number
    exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
            ignoreExpiration: false
        })
    }

    async validate(payload: DecodedJwt) {
        const userId = payload.sub

        return { id: userId }
    }
}
