import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null as string | null
    },
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            const token = action.payload
            state.token = token
        },
        clearToken(state) {
            state.token = null
        }
    }
})

export const { setToken, clearToken } = authSlice.actions

export const selectToken = (state: any) => state.auth.token

export default authSlice.reducer
