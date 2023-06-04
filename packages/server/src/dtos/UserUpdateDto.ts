import { IsDateString, IsEnum, IsString } from 'class-validator'

import { UserGender, Language } from '../models/enums'

export class UserUpdateDto {
    @IsEnum(UserGender)
    gender: UserGender

    @IsString()
    @IsDateString()
    dob: string

    @IsString()
    name: string

    @IsEnum(Language)
    lang: Language
}
