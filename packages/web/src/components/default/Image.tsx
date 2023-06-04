import { Box, SxProps } from '@mui/material'

type ImageProps = {
    src: string
    alt?: string
    sx?: SxProps
    [key: string]: any
}

export default function Image({ src, alt, sx, ...rest }: ImageProps) {
    return (
        <Box
            component="img"
            sx={sx}
            alt={alt}
            src={src}
            {...rest}
        />
    )
}
