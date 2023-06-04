import { User, AuthProvider, UserGender } from '../models'

export type Message = {
    id: string
    content: string
    sessionId: string
    sender: 'user' | 'mindy'
}

export type Session = {
    id: string
    created_at: string
}

export type ChatPayload = {
    messages: Message[]
}

export type UserUpdatePayload = {
    name: string
    dob: string
    gender: UserGender
    lang?: string
}

export type AuthPayload = {
    provider: AuthProvider
    accessToken: string
    lang: string
}

export type AuthResponse = {
    accessToken: string
    user: User
}
