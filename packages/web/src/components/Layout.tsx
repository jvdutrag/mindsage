import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress } from '@mui/material'

import { authApiSlice } from '../features/api'
import { authSlice } from '../features'

export default function Layout() {
    const [loading, setLoading] = useState(true)
    const firstRender = useRef(true)

    const token = useSelector(authSlice.selectToken)

    const [refresh] = authApiSlice.useRefreshMutation({ fixedCacheKey: 'shared-refresh' })

    useEffect(() => {
        if (firstRender.current === true || process.env.NODE_ENV !== 'development') {
            if (token) {
                return
            }

            refresh().unwrap().finally(() => setLoading(false))
        }

        return () => {
            firstRender.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstRender, setLoading])

    return (
        loading ? (
            <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'rgba(255, 255, 255, 0.5)' }}>
                <CircularProgress color="primary" />
            </Backdrop>
        ) : (
            <Outlet />
        )
    )
}