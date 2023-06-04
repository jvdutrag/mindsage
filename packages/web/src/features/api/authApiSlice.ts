import { apiSlice } from '../../app/api/apiSlice'
import { setToken, clearToken } from '../authSlice'

import { AuthPayload, AuthResponse } from '../../types'
import { setUser, clearUser } from '../userSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthPayload>({
            query: (payload: AuthPayload) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                dispatch(setToken(data.accessToken))
                dispatch(setUser(data.user))
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled

                dispatch(clearToken())
                dispatch(clearUser())
                setTimeout(() => dispatch(apiSlice.util.resetApiState()), 1000)
            }
        }),
        refresh: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                dispatch(setToken(data.accessToken))
                dispatch(setUser(data.user))
            }
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation
} = authApiSlice
