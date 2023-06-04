import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import * as authSlice from '../../features/authSlice'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.mindsage.app' : 'http://localhost:3000'

const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
        const refreshTokenResult = await baseQuery('/auth/refresh', api, extraOptions) as any
        
        if (refreshTokenResult.data) {
            api.dispatch(authSlice.setToken(refreshTokenResult.data))
            return baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(authSlice.clearToken())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth as any,
    endpoints: () => ({}),
    keepUnusedDataFor: 30,
    refetchOnMountOrArgChange: true
})
