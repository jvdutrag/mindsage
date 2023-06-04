import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthController, UserController } from './controllers'
import { AuthService, UserService, UserTokenService, SessionService, ChatService } from './services'
import { JwtStrategy } from './strategies'
import { OpenAiAdapter } from './adapters'
import { ChatGateway } from './gateways'
import { entities } from './models'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forFeature(entities),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                entities: entities,
                synchronize: true,
                type: 'postgres',
                port: 5432,
                host: config.get('DB_HOST'),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_DATABASE')
            })
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_ACCESS_SECRET')
            })
        }),
        PassportModule
    ],
    controllers: [
        AuthController,
        UserController
    ],
    providers: [
        JwtStrategy,
        AuthService,
        UserService,
        UserTokenService,
        ConfigService,
        SessionService,
        ChatService,
        OpenAiAdapter,
        ChatGateway
    ]
})

export class AppModule { }
