
import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route, useLocation } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { ModalProvider } from 'react-modal-hook'
import { TransitionGroup } from 'react-transition-group'
import { IoProvider } from 'socket.io-react-hook'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useTranslation } from 'react-i18next'

import { Layout } from './components'
import { LoggedInOnlyFilter, NotLoggedInOnlyFilter } from './components/routes'

import { Home, EntranceFlow, Platform, Legal } from './pages'
import { useUser } from './hooks'

import theme from './theme'
import routes from './routes'

import './app.css'

export function ScrollToTop() {
    const { pathname } = useLocation()

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    return null
}

export default function App() {
    const user = useUser()

    const { t, i18n } = useTranslation()

    const onGoogleScriptError = () => {
        window.alert(t('feedback.errors.google_script_error'))
    }

    React.useEffect(() => {
        if (user) {
            i18n.changeLanguage(user.language)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <React.Fragment>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string} onScriptLoadError={onGoogleScriptError}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <IoProvider>
                        <SnackbarProvider maxSnack={3}>
                            <ModalProvider rootComponent={TransitionGroup}>
                                <ScrollToTop />
                                <Routes>
                                    <Route path={routes.HOME} element={<Layout />}>
                                        <Route index element={<Home />} />
                                        <Route path={routes.PRIVACY} element={<Legal type="privacy" />} />
                                        <Route path={routes.TERMS} element={<Legal type="terms" />} />
                                        {/* Public Routes */}
                                        <Route element={<NotLoggedInOnlyFilter />}>
                                            <Route path={routes.LOGIN} element={<EntranceFlow type="login" />} />
                                            <Route path={routes.REGISTER} element={<EntranceFlow type="register" />} />
                                        </Route>
                                        {/* Private Routes */}
                                        <Route element={<LoggedInOnlyFilter />}>
                                            <Route path={routes.PLATFORM} element={<Platform />} />
                                        </Route>
                                    </Route>
                                </Routes>
                            </ModalProvider>
                        </SnackbarProvider>
                    </IoProvider>
                </ThemeProvider>
            </GoogleOAuthProvider>
        </React.Fragment>
    )
}
