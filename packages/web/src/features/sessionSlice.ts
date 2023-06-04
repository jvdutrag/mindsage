import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Session, Message } from '../types'

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        current: null as null | Session,
        messages: [] as Message[],
        chatLoading: false as boolean
    },
    reducers: {
        setSession(state, action: PayloadAction<Session>) {
            const session = action.payload
            state.current = session
        },
        clearSession(state) {
            state.current = null
        },
        setMessages(state, action: PayloadAction<Message[]>) {
            state.messages = action.payload
        },
        addMessage(state, action: PayloadAction<Message>) {
            const message = action.payload
            state.messages.push(message)
        },
        clearMessages(state) {
            state.messages = []
        },
        setChatLoading(state, action: PayloadAction<boolean>) {
            state.chatLoading = action.payload
        },
        incrementMessage(state, action: PayloadAction<Message>) {
            const message = action.payload

            const found = state.messages.find(m => m.id === message.id)

            if (!found) {
                state.messages.push(message)
                return
            }

            const index = state.messages.findIndex((m) => m.id === message.id)
            state.messages[index].content += message.content
        }
    }
})

export const { setSession, clearSession, setMessages, addMessage, clearMessages, setChatLoading, incrementMessage } = sessionSlice.actions

export const selectSession = (state: any): Session => state.session.current
export const selectMessages = (state: any): Message[] => state.session.messages
export const selectChatLoading = (state: any): boolean => state.session.chatLoading

export default sessionSlice.reducer
