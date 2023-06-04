import { Typography, Grid, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
    Mood as MoodIcon,
    Flare as FlareIcon,
    Insights as InsightsIcon,
    AcUnit as SnowIcon,
    AutoAwesome as SparkleIcon
} from '@mui/icons-material'

import { Image } from '../../components/default'

import BasePageLayout from '../BasePageLayout'

import routes from '../../routes'

import VectorOne from '../../assets/img1.png'
import VectorTwo from '../../assets/img2.png'
import VectorThree from '../../assets/img3.png'

export default function Home() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <BasePageLayout>
            <Grid container spacing={6}>
                <Grid item container>
                    <Grid item xs={12} md={6} order={{ xs: 1 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' }, alignItems: { xs: 'center', md: 'start' }, flexDirection: 'column' }}>
                        <Typography
                            variant="h3"
                            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' }, color: 'secondary.light' }}
                        >
                            {t('home.section_one.title')}
                        </Typography>
                        <Typography
                            color="white"
                            variant="body1"
                            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}
                        >
                            {t('home.section_one.paragraph_one')}
                        </Typography>
                        <Typography
                            color="white"
                            variant="body1"
                            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}
                        >
                            {t('home.section_one.paragraph_two')}
                        </Typography>
                        <Typography
                            color="white"
                            variant="body1"
                            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}
                        >
                            {t('home.section_one.paragraph_three')}
                        </Typography>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => navigate(routes.REGISTER)}
                            size="large"
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <SparkleIcon sx={{ mr: 1 }} />
                                {t('home.start')}
                            </div>
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        order={{ md: 1 }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image src={VectorOne} sx={{ height: 350 }} />
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        order={{ md: 1 }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image src={VectorTwo} sx={{ height: 350, mb: 2 }} />
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        md={6}
                        order={{ xs: 1 }}
                        spacing={3}
                    >
                        <Grid item xs={12} sx={{ textAlign: { xs: 'center', md: 'right' }, mb: 3 }}>
                            <Typography
                                variant="h3"
                                sx={{ mb: 2, color: 'secondary.light' }}
                            >
                                {t('home.section_two.title')}
                            </Typography>
                            <Typography
                                color="white"
                                variant="body1"
                            >
                                {t('home.section_two.paragraph')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: 'center', mb: 1 }}>
                            <MoodIcon fontSize="inherit" sx={{ color: 'secondary.light', fontSize: 56 }} />
                            <Typography
                                variant="body1"
                                sx={{ fontFamily: 'Roboto Slab, sans-serif', fontSize: 18, color: 'secondary.light' }}
                            >
                                {t('home.section_two.points.one.title')}
                            </Typography>
                            <Typography
                                color="white"
                                variant="body1"
                            >
                                {t('home.section_two.points.one.description')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: 'center', mb: 1 }}>
                            <FlareIcon fontSize="inherit" sx={{ color: 'secondary.light', fontSize: 56 }} />
                            <Typography
                                color="white"
                                variant="body1"
                                sx={{ fontFamily: 'Roboto Slab, sans-serif', fontSize: 18, color: 'secondary.light' }}
                            >
                                {t('home.section_two.points.two.title')}
                            </Typography>
                            <Typography
                                color="white"
                                variant="body1"
                            >
                                {t('home.section_two.points.two.description')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: 'center', mb: 1 }}>
                            <InsightsIcon fontSize="inherit" sx={{ color: 'secondary.light', fontSize: 56 }} />
                            <Typography
                                variant="body1"
                                sx={{ fontFamily: 'Roboto Slab, sans-serif', fontSize: 18, color: 'secondary.light' }}
                            >
                                {t('home.section_two.points.three.title')}
                            </Typography>
                            <Typography
                                color="white"
                                variant="body1"
                            >
                                {t('home.section_two.points.three.description')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: 'center', mb: 1 }}>
                            <SnowIcon fontSize="inherit" sx={{ color: 'secondary.light', fontSize: 56 }} />
                            <Typography
                                variant="body1"
                                sx={{ fontFamily: 'Roboto Slab, sans-serif', fontSize: 18, color: 'secondary.light' }}
                            >
                                {t('home.section_two.points.four.title')}
                            </Typography>
                            <Typography
                                color="white"
                                variant="body1"
                            >
                                {t('home.section_two.points.four.description')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item xs={12} md={6} order={{ xs: 1 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' }, alignItems: { xs: 'center', md: 'start' }, flexDirection: 'column' }}>
                        <Typography
                            variant="h3"
                            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' }, color: 'secondary.light' }}
                        >
                            {t('home.section_three.title')}
                        </Typography>
                        <Typography
                            color="white"
                            variant="body1"
                            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}
                        >
                            {t('home.section_three.paragraph_one')}
                        </Typography>
                        <Typography
                            color="white"
                            variant="body1"
                            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}
                        >
                            {t('home.section_three.paragraph_two')}
                        </Typography>
                        <Typography
                            color="white"
                            variant="body1"
                            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}
                        >
                            {t('home.section_three.paragraph_three')}
                        </Typography>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => navigate(routes.REGISTER)}
                            size="large"
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <SparkleIcon sx={{ mr: 1 }} />
                                {t('home.start')}
                            </div>
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        order={{ md: 1 }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Image src={VectorThree} sx={{ height: 350 }} />
                    </Grid>
                </Grid>
            </Grid>
        </BasePageLayout>
    )
}
