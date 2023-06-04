import { useState, useEffect } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [width, setWidth] = useState<number>(window.innerWidth)

    function handleWindowSizeChange() {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [])

    useEffect(() => {
        if (width < 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [width])

    return isMobile
}
