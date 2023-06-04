import { useSelector } from 'react-redux'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { authApiSlice } from '../../features/api'
import { authSlice } from '../../features'

import routes from '../../routes'

export default function LoggedFilter() {
    const token = useSelector(authSlice.selectToken)
    const location = useLocation()

    // eslint-disable-next-line
    const [_, { isError }] = authApiSlice.useRefreshMutation({ fixedCacheKey: 'shared-refresh' })

    return (isError && !token) ? <Navigate to={routes.LOGIN} state={{ from: location }} replace /> : <Outlet />
}
