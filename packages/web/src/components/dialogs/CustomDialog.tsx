import { ReactNode } from 'react'
import { Dialog, DialogTitle, Box, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

type CustomDialogProps = {
    open: boolean
    onClose: () => void
    title: ReactNode
    children: ReactNode
}

export default function CustomDialog({ open, onClose, title, children }: CustomDialogProps) {
    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                {title}
                <IconButton onClick={onClose} sx={{ float: 'right' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box sx={{ pr: 3, pl: 3, pb: 3 }}>
                {children}
            </Box>
        </Dialog>
    )
}
