import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../models'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: null as User | null
    },
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            const user = action.payload
            state.current = user
        },
        clearUser(state) {
            state.current = null
        }
    }
})

export const { setUser, clearUser } = userSlice.actions

export const selectUser = (state: any): User => state.user.current

export default userSlice.reducer
