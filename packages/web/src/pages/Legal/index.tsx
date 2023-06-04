import { Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'

import BasePageLayout from '../BasePageLayout'

import { PortugueseTerms, EnglishTerms, SpanishTerms } from './terms'
import { PortuguesePrivacy, EnglishPrivacy, SpanishPrivacy } from './privacy'

type LegalProps = {
    type: 'privacy' | 'terms'
}

export default function Legal({ type }: LegalProps) {
    const { i18n } = useTranslation()

    const updateDate = '30/05/2023'

    const buildComponentBasedOnLanguageAndType = (language: string, type: string) => {
        switch (language) {
            case 'pt':
                return type === 'privacy' ? <PortuguesePrivacy updateDate={updateDate} /> : <PortugueseTerms updateDate={updateDate} />
            case 'en':
                return type === 'privacy' ? <EnglishPrivacy updateDate={updateDate} /> : <EnglishTerms updateDate={updateDate} />
            case 'es':
                return type === 'privacy' ? <SpanishPrivacy updateDate={updateDate} /> : <SpanishTerms updateDate={updateDate} />
            default:
                break
        }

    }

    return (
        <BasePageLayout>
            <Paper variant="outlined">
                <Grid container>
                    <Grid item xs={12} sx={{ p: 3 }}>
                        {buildComponentBasedOnLanguageAndType(i18n.language, type)}
                    </Grid>
                </Grid>
            </Paper>
        </BasePageLayout>
    )
}
