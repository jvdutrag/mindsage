import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './AppModule'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config = app.get<ConfigService>(ConfigService)

    const port = config.get('PORT')
    const cookieSecret = config.get('COOKIE_SECRET')

    app.use(cookieParser(cookieSecret))
    app.enableCors({
        origin: ['http://localhost:5000', 'https://mindsage.app'],
        credentials: true
    })
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(port);
    console.log(`[Server] Success running on port ${port}`)
}

bootstrap()
