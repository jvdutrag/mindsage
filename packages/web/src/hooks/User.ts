import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { userSlice } from '../features'
import { User } from '../models'

export function useUser(): User | null {
    const hasUser = useSelector(userSlice.selectUser)

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (hasUser) {
            setUser(hasUser)
        } else {
            setUser(null)
        }
    }, [hasUser])

    return user
}
