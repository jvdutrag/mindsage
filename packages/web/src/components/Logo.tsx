import { Link } from 'react-router-dom'
import { Image } from './default'
import { CSSProperties } from 'react'

import LogoBlack from '../assets/logo_black.png'
import LogoWhite from '../assets/logo_white.png'
import LogoColored from '../assets/logo_colored.png'

type LogoProps = {
    color: 'black' | 'white' | 'colored'
    height?: number
    disableLink?: boolean
    style?: CSSProperties
}

export default function Logo({ color, height, disableLink, style }: LogoProps) {
    const getSource = () => {
        switch (color) {
            case 'black':
                return LogoBlack
            case 'white':
                return LogoWhite
            case 'colored':
                return LogoColored
        }
    }

    const renderImage = () => (
        <Image
            sx={{
                display: { xs: 'flex' },
                mr: 1,
                height: height ? height : 75
            }}
            alt="MindSage Logo"
            src={getSource()}
            draggable={false}
        />
    )

    return (
        disableLink ? renderImage() : (
            <Link
                to="/"
                style={{
                    display: 'flex',
                    color: 'inherit',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    ...style
                }}
            >
                {renderImage()}
            </Link>
        )
    )
}
