import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './api/apiSlice'

import { authSlice, userSlice, sessionSlice } from '../features'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.default,
        user: userSlice.default,
        session: sessionSlice.default
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
