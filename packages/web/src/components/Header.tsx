import { Fragment, useState } from 'react'
import {
    Container, Box, Button, Drawer, List,
    ListItemButton, ListItemText, IconButton,
    ListItemIcon, Menu, MenuItem, Typography,
    Divider, Collapse
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'

import {
    Menu as MenuIcon,
    Login as LoginIcon,
    KeyboardArrowDown as ArrowDownIcon,
    Language as LanguageIcon,
    Check as CheckIcon,
    ExpandLess as ExpandLessIcon,
    SpaceDashboard as DashboardIcon
} from '@mui/icons-material'

import { Language } from '../models'
import { languages } from '../utils'
import { useIsLogged } from '../hooks'

import Logo from './Logo'

import routes from '../routes'

export default function Header() {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const isLogged = useIsLogged()

    const [open, setOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const langListOpen = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const selectLanguage = (lang: string) => {
        localStorage.setItem('language', lang)
        i18n.changeLanguage(lang)
        handleClose()
    }

    const getCountryCodeByLanguage = (lang: string) => {
        switch (lang) {
            case 'en':
                return 'us'
            case 'es':
                return 'es'
            case 'pt':
                return 'br'
            default:
                return ''
        }
    }

    return (
        <Fragment>
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: '#121212',
                        color: 'rgba(255, 255, 255, 0.7)',
                    }
                }}
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{ width: 'auto' }}
                    role="presentation"
                    onClick={() => setOpen(false)}
                >
                    <List>
                        {
                            isLogged ? (
                                <ListItemButton onClick={() => navigate(routes.PLATFORM)}>
                                    <ListItemIcon>
                                        <DashboardIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={t('header.platform')} />
                                </ListItemButton>
                            ) : (
                                <ListItemButton onClick={() => navigate(routes.LOGIN)}>
                                    <ListItemIcon>
                                        <LoginIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={t('header.login')} />
                                </ListItemButton>
                            )
                        }
                        <Divider />
                        {
                            !isLogged && (
                                <>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LanguageIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={t('common.language')} />
                                        <ExpandLessIcon />
                                    </ListItemButton>
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                                Object.keys(i18n.services.resourceStore.data).map((lang: string, index: number) => (
                                                    <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => selectLanguage(lang)}>
                                                        <ListItemIcon>
                                                            <ReactCountryFlag countryCode={getCountryCodeByLanguage(lang)} svg />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={(
                                                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    {languages[lang as Language]}
                                                                    {
                                                                        lang === i18n.languages[0] && (
                                                                            <CheckIcon sx={{ ml: 1 }} />
                                                                        )
                                                                    }
                                                                </Typography>
                                                            )}
                                                        />
                                                    </ListItemButton>
                                                ))
                                            }
                                        </List>
                                    </Collapse>
                                </>
                            )
                        }
                    </List>
                </Box>
            </Drawer>
            <Container
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                    mb: 4
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <Logo color="white" />
                </Box>
                <Box sx={{ display: { md: 'none', xs: 'flex' } }}>
                    <IconButton onClick={() => setOpen(true)}>
                        <MenuIcon sx={{ color: '#fff' }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    {
                        !isLogged && (
                            <Box sx={{ mr: 1 }}>
                                <IconButton onClick={handleClick}>
                                    <LanguageIcon sx={{ mr: 1, color: 'white' }} />
                                    <ArrowDownIcon sx={{ color: 'white' }} />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={langListOpen} onClose={handleClose} PaperProps={{ style: { width: '20ch' } }}>
                                    {
                                        Object.keys(i18n.services.resourceStore.data).map((lang, index) => (
                                            <MenuItem key={index} onClick={() => selectLanguage(lang)}>
                                                <ReactCountryFlag countryCode={getCountryCodeByLanguage(lang)} svg />
                                                <Typography sx={{ ml: 1, mr: 1 }}>{languages[lang as Language]}</Typography>
                                                {
                                                    lang === i18n.languages[0] && (
                                                        <CheckIcon />
                                                    )
                                                }
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </Box>
                        )
                    }
                    <Box>
                        <Button
                            sx={{ my: 2, mr: 1 }}
                            color="info"
                            variant="contained"
                            onClick={() => isLogged ? navigate(routes.PLATFORM) : navigate(routes.LOGIN)}
                        >
                            {
                                isLogged ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <DashboardIcon sx={{ mr: 1 }} />
                                        {t('header.platform')}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <LoginIcon sx={{ mr: 1 }} />
                                        {t('header.login')}
                                    </div>
                                )
                            }
                        </Button>  
                    </Box>
                </Box>
            </Container>
        </Fragment>
    )
}
