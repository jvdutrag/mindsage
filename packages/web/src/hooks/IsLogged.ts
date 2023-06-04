import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { authSlice } from '../features'

export function useIsLogged() {
  const [isLogged, setIsLogged] = useState(false)
  const token = useSelector(authSlice.selectToken)

  useEffect(() => {
    if (token) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [token])

  return isLogged
}
