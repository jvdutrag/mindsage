import { Grid, TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Warning as WarningIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useModal } from 'react-modal-hook'

import { useUser, useLogout } from '../../../hooks'
import { userApiSlice } from '../../../features/api'
import { userSlice, authSlice } from '../../../features'
import { DeleteAccountDialog } from '../../../components/dialogs'

import routes from '../../../routes'

import AccountForm from './AccountForm'

export default function Account() {
    const user = useUser()
    const logout = useLogout()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { t } = useTranslation()

    const [end] = userApiSlice.useEndMutation()
    
    const [deleteDialog, hideDeleteDialog] = useModal(({ in: open }) => <DeleteAccountDialog open={open} onClose={hideDeleteDialog} onConfirm={onClickDeleteButton} />)

    const onClickDeleteButton = async () => {
        await end().unwrap()
            .then(() => {
                dispatch(userSlice.clearUser())
                dispatch(authSlice.clearToken())
                navigate(routes.HOME)
            })
    }

    if (!user) {
        return null
    }

    return (
        <Grid container sx={{ p: 3 }} spacing={3}>
            <Grid item xs={12} md={6}>
                <AccountForm />
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            variant="outlined"
                            label={t('account.email')}
                            value={user.email}
                            helperText={`${t('account.connected_with.title')} ${t(`account.connected_with.${user.provider}`)}`}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" fullWidth onClick={() => logout()}>
                            <LogoutIcon sx={{ mr: 1 }} />
                            {t('account.logout')}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="error" fullWidth onClick={deleteDialog}>
                            <WarningIcon sx={{ mr: 1 }} />
                            {t('account.delete')}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
