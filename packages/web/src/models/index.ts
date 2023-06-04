export enum AuthProvider {
    GOOGLE = 'google',
    APPLE = 'apple'
}

export enum UserGender {
    MALE = 'M',
    FEMALE = 'F',
    NON_BINARY = 'NB'
}

export enum Language {
    ENGLISH = 'en',
    SPANISH = 'es',
    PORTUGUESE = 'pt'
}

export class User {
    id: string = ''
    email: string = ''
    provider: string = ''
    name: string = ''
    data: UserData | null = null
    language: Language = Language.PORTUGUESE
}

export class UserData {
    id: string = ''
    date_of_birth: string = ''
    gender: UserGender = UserGender.NON_BINARY
}