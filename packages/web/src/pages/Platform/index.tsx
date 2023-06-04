import { useState } from 'react'
import { Container, Grid, Paper, Tabs, Tab, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Chat as ChatIcon, AccountCircle as AccountIcon } from '@mui/icons-material'

import ChatBox from './ChatBox'
import ChatBoxSetup from './ChatBox/Setup'
import Account from './Account'

import { Logo, Footer } from '../../components'
import { useUser } from '../../hooks'

export default function Platform() {
    const user = useUser()

    const [tab, setTab] = useState(0)

    const { t } = useTranslation()

    const showContent = () => {
        switch (tab) {
            case 0:
                return user && user.data ? <ChatBox /> : <ChatBoxSetup />
            case 1:
                return <Account />
        }
    }

    return (
        <Container disableGutters maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <Logo color="white" />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper variant="outlined" sx={{ width: '100%', height: { md: '100%', xs: '100vh' } }}>
                        <Box sx={{ bgcolor: 'grey.100' }}>
                            <Tabs
                                value={tab}
                                onChange={(_, newValue) => setTab(newValue)}
                                variant="fullWidth"
                            >
                                <Tab wrapped icon={<ChatIcon />} label={t('chat.menu.talk')} />
                                <Tab wrapped icon={<AccountIcon />} label={t('chat.menu.account')} />
                            </Tabs>
                        </Box>
                        <Box sx={{ height: { md: '500px' } }}>
                            {
                                1 + 1 === 3 ? <div>Loading...</div> : showContent()
                            }
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Container>
    )
}