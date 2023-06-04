import { Box, SxProps } from '@mui/material'

type DividerProps = {
    sx?: SxProps
    [key: string]: any
}

export default function Divider({ sx, ...rest }: DividerProps) {
    return (
        <Box
            component="hr"
            sx={{
                ...sx,
                width: '100%',
                borderColor: 'secondary.light',
                borderTop: '0',
                opacity: '0.3',
                mt: 2,
                mb: 2
            }}
            {...rest}
        />
    )
}
