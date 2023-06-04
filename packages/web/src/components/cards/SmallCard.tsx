import { ReactNode, CSSProperties } from 'react'

import { Paper } from '@mui/material'

type SmallCardProps = {
    children: ReactNode
    clickable?: boolean,
    style?: CSSProperties
    onClick?: () => void
}

export default function SmallCard({ children, clickable, style, onClick }: SmallCardProps) {
    return (
      <Paper
        variant="outlined"
        elevation={0}
        sx={{
          padding: 1,
          bgcolor: 'grey.200',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: clickable ? 'pointer' : 'default',
          flexDirection: 'column',
          textAlign: 'center',
          height: '100%',
          ...style
        }}
        onClick={onClick}
      >
        {children}
      </Paper>
    )
}