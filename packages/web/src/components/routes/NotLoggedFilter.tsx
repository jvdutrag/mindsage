import { useSelector } from 'react-redux'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { authApiSlice } from '../../features/api'
import { authSlice } from '../../features'

import routes from '../../routes'

export default function NotLoggedFilter() {
    const token = useSelector(authSlice.selectToken)
    const location = useLocation()

    // eslint-disable-next-line
    const [_, { isSuccess }] = authApiSlice.useRefreshMutation({ fixedCacheKey: 'shared-refresh' })

    return (isSuccess && token) ? <Navigate to={routes.PLATFORM} state={{ from: location }} replace /> : <Outlet />
}
