import { apiSlice } from '../../app/api/apiSlice'
import { setUser } from '../userSlice'

import { UserUpdatePayload } from '../../types'
import { User } from '../../models'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        update: builder.mutation<User, UserUpdatePayload>({
            query: (payload: UserUpdatePayload) => ({
                url: '/user/update',
                method: 'PUT',
                body: payload
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                dispatch(setUser(data))

                localStorage.setItem('language', data.language)

                setTimeout(() => dispatch(apiSlice.util.resetApiState()), 1000)
            }
        }),
        get: builder.mutation<User, void>({
            query: () => ({
                url: '/user',
                method: 'GET'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                dispatch(setUser(data))
                
                setTimeout(() => dispatch(apiSlice.util.resetApiState()), 1000)
            }
        }),
        end: builder.mutation<void, void>({
            query: () => ({
                url: '/user',
                method: 'DELETE'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled

                setTimeout(() => dispatch(apiSlice.util.resetApiState()), 1000)
            }
        })
    })
})

export const {
    useGetMutation,
    useUpdateMutation,
    useEndMutation
} = userApiSlice
