import { Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import CustomDialog from './CustomDialog'

type DeleteAccountDialogProps = {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function DeleteAccountDialog({ open, onClose, onConfirm }: DeleteAccountDialogProps) {
    const { t } = useTranslation()

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            title={t('account.dialog.title')}
        >
            <Typography variant="body1">
                {t('account.dialog.description')}
            </Typography>
            <Button variant="text" color="error" onClick={onConfirm} sx={{ float: 'right' }}>
                {t('common.confirm')}
            </Button>
        </CustomDialog>
    )
}
