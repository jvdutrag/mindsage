import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { authApiSlice } from '../features/api'

import routes from '../routes'

export function useLogout() {
    const navigate = useNavigate()

    const [logout, {
        isSuccess
    }] = authApiSlice.useLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            navigate(routes.HOME)
        }
    }, [isSuccess, navigate])

  return logout
}
