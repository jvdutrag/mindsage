import { Box, Typography, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Link } from '../components'

import routes from '../routes'

export default function Footer() {
    const { t } = useTranslation()

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 4, mb: 4 }}>
            <Typography
                color="white"
                variant="body1"
                sx={{ textAlign: 'center' }}
            >
                &copy; {new Date().getFullYear()} MindSage
            </Typography>
            <Typography
                color="white"
                variant="body1"
                sx={{ textAlign: 'center' }}
            >
                {t('common.email')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 1, mt: 1 }}>
                <Link to={routes.TERMS} color="grey.50">
                    {t('common.terms_of_use')}
                </Link>
                <Divider orientation="vertical" flexItem />
                <Link to={routes.PRIVACY} color="grey.50">
                    {t('common.privacy_policy')}
                </Link>
            </Box>
        </Box>
    )
}
