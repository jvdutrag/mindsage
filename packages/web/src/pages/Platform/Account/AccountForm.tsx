import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button, CircularProgress as Loader, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import 'moment/locale/pt-br'

import { useUser, useAlert } from '../../../hooks'
import { userApiSlice } from '../../../features/api'
import { UserGender, Language } from '../../../models'
import { languages } from '../../../utils'

export default function AccountForm() {
    const user = useUser()
    const alert = useAlert()

    const { t, i18n } = useTranslation()

    const [loading, setLoading] = useState<boolean>(false)

    const [name, setName] = useState<string>('')
    const [dob, setDob] = useState<string>('')
    const [gender, setGender] = useState<UserGender>('' as UserGender)
    const [lang, setLang] = useState<string>(i18n.language)

    const [errors, setErrors] = useState({
        name: false,
        dob: false,
        gender: false,
        lang: false
    })

    const [update] = userApiSlice.useUpdateMutation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if (!name || !dob || !gender || !lang) {
            setErrors({
                name: !!!name,
                dob: !!!dob,
                gender: !!!gender,
                lang: !!!lang
            })
            return
        }

        setErrors({
            name: false,
            dob: false,
            gender: false,
            lang: false
        })

        setLoading(true)

        update({ name, dob, gender, lang }).unwrap()
            .then(() => {
                setLoading(false)
                alert(t('feedback.success.saving'), 'success')
            })
            .catch(err => {
                const message = err.data.code ? t(`errors.${err.data.code}`) : t('feedback.errors.saving')
                alert(message, 'error')
            })
    }

    useEffect(() => {
        if (user && user.data) {
            setName(user.name)
            setDob(user.data.date_of_birth)
            setGender(user.data.gender)
            setLang(user.language)
        }
    }, [user])

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        error={errors.name}
                        label={t('account.form.name.label')}
                        placeholder={String(t('account.form.name.placeholder'))}
                        helperText={t('account.form.name.helperText')}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        margin="normal"
                        name="gender"
                        required
                        fullWidth
                        label={t('account.form.gender.label')}
                        error={errors.gender}
                        disabled={false}
                        value={gender}
                        onChange={(e) => setGender(e.target.value as UserGender)}
                    >
                        <MenuItem value="F">{t('common.genders.F')}</MenuItem>
                        <MenuItem value="M">{t('common.genders.M')}</MenuItem>
                        <MenuItem value="NB">{t('common.genders.NB')}</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
                        <DatePicker
                            disableFuture
                            minDate={moment().subtract(100, 'years')}
                            maxDate={moment().subtract(18, 'years')}
                            sx={{ width: '100%' }}
                            slotProps={{
                                actionBar: { actions: ['accept'] },
                                textField: { error: errors.dob }
                            }}
                            onAccept={(date) => date ? setDob(date.format('YYYY-MM-DD')) : setDob('')}
                            onChange={(date) => date ? setDob(date.format('YYYY-MM-DD')) : setDob('')}
                            closeOnSelect={false}
                            value={dob ? moment(dob) : null}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        margin="normal"
                        name="language"
                        required
                        fullWidth
                        label={t('account.form.lang.label')}
                        error={errors.lang}
                        disabled={false}
                        value={lang}
                        onChange={(e) => setLang(e.target.value as Language)}
                    >
                        {
                            Object.keys(i18n.services.resourceStore.data).map((lang, index) => (
                                <MenuItem value={lang} key={index}>
                                    {languages[lang as Language]}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {
                            loading ? (
                                <Loader size={20} color="inherit" />
                            ) : (
                                t('account.form.submit')
                            )
                        }
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
