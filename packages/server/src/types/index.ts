import { Request as ExpressRequest } from 'express'

import { User } from '../models'

export type AuthResponse = {
    accessToken: string
    user: User,
    refreshToken?: string
}

export type Request = ExpressRequest & {
    user: User
}

export type HashedData = {
    value: string
    type: 'number' | 'string' | 'boolean'
}

export type Message = {
    id: string
    content: string
    sessionId: string
    sender: 'user' | 'mindy'
}
