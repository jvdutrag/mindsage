import { useNavigate } from 'react-router-dom'
import { Typography, Box, Paper, Grid, Button, CircularProgress } from '@mui/material'
import { useTranslation, Trans } from 'react-i18next'
import { useGoogleLogin } from '@react-oauth/google'
import { Apple as AppleIcon } from '@mui/icons-material'
import { FcGoogle as GoogleIcon } from 'react-icons/fc'

import { useAlert } from '../../hooks'
import { Logo, Link } from '../../components'
import { Image } from '../../components/default'
import { AuthProvider } from '../../models'

import Vector from '../../assets/img4.png'

import { authApiSlice } from '../../features/api'

import routes from '../../routes'

type EntranceFlowProps = {
    type: 'login' | 'register'
}

export default function EntranceFlow({ type }: EntranceFlowProps) {
    const { t, i18n } = useTranslation()

    const navigate = useNavigate()
    const alert = useAlert()

    const [login, { isLoading }] = authApiSlice.useLoginMutation()

    const sendAccessToken = async (provider: AuthProvider, accessToken: string) => {
        await login({ accessToken, provider, lang: i18n.language }).unwrap()
            .then(() => {
                navigate(routes.PLATFORM)
            })
            .catch(err => {
                const message = err.data.code ? t(`errors.${err.data.code}`) : t('feedback.errors.logging_in')
                alert(message, 'error')
            })
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            sendAccessToken(AuthProvider.GOOGLE, tokenResponse.access_token)
        },
        onError: () => alert(t('feedback.errors.logging_in'), 'error')
    })

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Grid
                container
                component={Paper}
                sx={{
                    height: {
                        xs: window.innerHeight,
                        md: '400px'
                    },
                    width : {
                        xs: '100%',
                        md: '800px'
                    }
                }}
                padding={3}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: {
                            md: 'center',
                            xs: 'flex-end'
                        }
                    }}
                >
                    <Image src={Vector} sx={{ width: 250 }} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: {
                            md: 'center',
                            xs: 'flex-start'
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        <Logo color="colored" />
                        <Typography variant="h5" textAlign="center">
                            {t(`${type}.title`)}
                        </Typography>
                        <Typography variant="body1" textAlign="center">
                            {t(`${type}.description`)}
                        </Typography>
                        {
                            isLoading ? (
                                    <CircularProgress />
                            ) : (
                                <Box>
                                    <Button disabled={isLoading} variant="outlined" color="inherit" onClick={() => loginWithGoogle()} fullWidth sx={{ mb: 1 }}>
                                        <GoogleIcon style={{ fontSize: '24px', marginRight: '5px' }} />
                                        {t('common.continue_with_google')}
                                    </Button>
                                    <Button disabled variant="outlined" color="inherit" fullWidth>
                                        <AppleIcon sx={{ mr: '5px', fontSize: '24px' }} />
                                        {t('common.continue_with_apple')}
                                    </Button>
                                </Box>
                            )
                        }
                        <Trans i18nKey="common.entrance_flow_warning">
                            <Typography variant="caption" textAlign="center">
                                {t('common.entrance.one')} <Link to={routes.PRIVACY}>{t('common.privacy_policy')}</Link> {t('common.entrance.two')} <Link to={routes.TERMS}>{t('common.terms_of_use')}</Link>
                            </Typography>
                        </Trans>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
