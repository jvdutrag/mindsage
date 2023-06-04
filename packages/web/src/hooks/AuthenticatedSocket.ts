import { useSocket } from 'socket.io-react-hook'
import { useSelector } from 'react-redux'

import { authSlice } from '../features'

export function useAuthenticatedSocket() {
    const token = useSelector(authSlice.selectToken)

    const host = process.env.NODE_ENV === 'production' ? 'https://api.mindsage.app/chat' : 'http://localhost:3000/chat'

    return useSocket(host, {
        extraHeaders: {
            Authorization: `Bearer ${token}`
        },
        enabled: !!token
    })
}
