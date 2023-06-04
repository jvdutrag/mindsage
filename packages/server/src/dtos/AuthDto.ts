import { IsEnum, IsString } from 'class-validator'

import { AuthProvider, Language } from '../models/enums'

export class AuthDto {
    @IsEnum(AuthProvider)
    provider: AuthProvider

    @IsString()
    accessToken: string

    @IsEnum(Language)
    lang: Language
}
