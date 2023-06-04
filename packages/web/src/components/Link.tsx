import { Link as MuiLink, TypographyProps } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = {
    to: string
    color?: TypographyProps['color'] | 'primary'
    children: React.ReactNode
}

export default function Link({ to, color, children }: LinkProps) {
    return (
        <MuiLink underline="none" color={color} component={RouterLink} to={to}>
            {children}
        </MuiLink>
    )
}
