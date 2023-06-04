import { useState, useEffect, useRef } from 'react'
import { Grid, Avatar, Typography, Button, Box, LinearProgress, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { MessageBox } from 'react-chat-elements'
import { MobileDatePicker as DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import 'moment/locale/pt-br'
import 'react-chat-elements/dist/main.css'

import { Message, UserUpdatePayload } from '../../../types'
import { UserGender } from '../../../models'
import { ChatInput } from '../../../components'

import { userApiSlice } from '../../../features/api'

import MindyAvatar from '../../../assets/mindy.png'

export default function ChatBoxSetup() {
    const { t, i18n } = useTranslation()

    const [open, setOpen] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [step, setStep] = useState<number>(-1)
    const [data, setData] = useState<UserUpdatePayload>({
        name: '',
        gender: UserGender.NON_BINARY,
        dob: '',
        lang: i18n.language
    })

    const bottomRef = useRef<HTMLDivElement>(null)

    const theme = useTheme()

    const [update] = userApiSlice.useUpdateMutation()

    const startSetup = () => {
        setOpen(true)
        setStep(0)
    }

    const sendToNextStep = () => {
        setStep(step + 1)
    }

    const updateData = (key: string, value: string) => {
        if (value.length === 0) {
            return
        }

        setData(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const endSetup = () => {
        setIsLoading(true)
        setStep(-1)

        update(data).then(() => {
            setIsLoading(false)
            setMessages([])
        })
    }

    const renderInputOptions = () => {
        switch (step) {
            case 0:
            case 1: {
                return (
                    <Grid item xs={12} sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="text" onClick={sendToNextStep} fullWidth>
                            {t('chat.box.setup.next')}
                        </Button>
                    </Grid>
                )
            }
            case 2: {
                return (
                    <Grid item xs={12}>
                        <ChatInput onSubmit={text => updateData('name', text)} />
                    </Grid>
                )
            }
            case 3: {
                return (
                    <Grid item xs={12} sx={{ p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="text" onClick={() => updateData('gender', 'M')} sx={{ mr: 1 }} fullWidth>
                            {t('common.genders.M')}
                        </Button>
                        <Button variant="text" onClick={() => updateData('gender', 'F')} sx={{ mr: 1 }} fullWidth>
                            {t('common.genders.F')}
                        </Button>
                        <Button variant="text" onClick={() => updateData('gender', 'NB')} fullWidth>
                            {t('common.genders.NB')}
                        </Button>
                    </Grid>
                )
            }
            case 4: {
                return (
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
                            <DatePicker
                                disableFuture
                                minDate={moment().subtract(100, 'years')}
                                maxDate={moment().subtract(18, 'years')}
                                sx={{ width: '100%', '& fieldset': { border: 'none' } }}
                                slotProps={{
                                    actionBar: { actions: ['accept'] }
                                }}
                                onAccept={(date) => updateData('dob', date?.format('YYYY-MM-DD') || '')}
                                closeOnSelect={false}
                                inputRef={ref => {
                                    if (!ref) return

                                    ref.onkeyup = (e) => {
                                        if (e.key === 'Enter') {
                                            // @ts-ignore
                                            updateData('dob', moment(e.target.value).format('YYYY-MM-DD'))
                                        }
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                )
            }
        }
    }

    useEffect(() => {
        if (step === -1) {
            return
        }

        const nextStep = step + 1

        if (step === nextStep) {
            return
        }

        let message: Message | null = null

        switch (step) {
            case 2: {
                message = {
                    content: data.name,
                    id: uuid(),
                    sender: 'user',
                    sessionId: ''
                }
                break
            }
            case 3: {
                message = {
                    content: t(`common.genders.${data.gender}`),
                    id: uuid(),
                    sender: 'user',
                    sessionId: ''
                }
                break
            }
            case 4: {
                message = {
                    content: moment(data.dob).format('DD/MM/YYYY'),
                    id: uuid(),
                    sender: 'user',
                    sessionId: ''
                }
            }
        }

        if (message) {
            setMessages(prev => [...prev, message!])
        }

        sendToNextStep()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (step === -1) {
            return
        }

        const message: Message = {
            content: t(`chat.box.setup.steps.${step}`),
            id: uuid(),
            sender: 'mindy',
            sessionId: ''
        }

        setMessages(prev => [...prev, message])

        if (step === 5) {
            endSetup()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    if (!open) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    p: 2
                }}
            >
                <Avatar
                    sx={{ width: '250px', height: '250px', bgcolor: 'primary.main', mb: 1 }}
                    src={MindyAvatar}
                    alt="Mindy Avatar"
                />
                <Typography variant="h5" sx={{ color: 'primary.main', mb: 1 }}>
                    {t('chat.box.setup.title')}
                </Typography>
                <Typography variant="body1" sx={{ width: { md: '400px', xs: undefined }, mb: 1 }}>
                    {t('chat.box.setup.description')}
                </Typography>
                <Button color="primary" variant="contained" onClick={startSetup}>
                    {t('chat.box.setup.button')}
                </Button>
            </Box>
        )
    }

    return (
        <Box width="100%" height="100%" position="relative">
            <Grid container sx={{ overflowY: 'auto', height: '90%', bgcolor: 'secondary.light', p: 1 }}>
                <Grid item xs={12}>
                    {
                        messages.map((message, index) => {
                            if (message.sender === 'mindy') {
                                return (
                                    <Box sx={{ display: 'flex' }} key={index}>
                                        <Avatar
                                            sx={{ width: '50px', height: '50px', bgcolor: 'primary.main', mb: 1 }}
                                            src={MindyAvatar}
                                            alt="Mindy Avatar"
                                        />
                                        <MessageBox
                                            title="Mindy"
                                            titleColor={theme.palette.primary.main}
                                            position="left"
                                            type="text"
                                            text={message.content}
                                        />
                                    </Box>
                                )
                            } else {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            '.rce-mbox.rce-mbox-right': { backgroundColor: 'primary.light' }
                                        }}
                                    >
                                        <MessageBox
                                            position="right"
                                            type="text"
                                            text={message.content}
                                            key={index}
                                            style={{ backgroundColor: 'red' }}
                                        />
                                    </Box>
                                )
                            }
                        })
                    }
                </Grid>
                <Grid item xs={12} ref={bottomRef} />
            </Grid>
            <Grid container sx={{ position: { md: 'absolute', xs: undefined }, bottom: 0, bgcolor: 'white', height: '10%' }}>
                {
                    isLoading ? (
                        <Grid item xs={12}>
                            <LinearProgress />
                                <Typography
                                    variant="body1"
                                    color="gray"
                                    alignSelf="center"
                                    justifySelf="center"
                                    textAlign="center"
                                    sx={{
                                        userSelect: 'none',
                                        mt: 1
                                    }}
                                >
                                    {t('chat.box.setup.loading')}
                                </Typography>
                        </Grid>
                    ) : (
                        renderInputOptions()
                    )
                }
            </Grid>
        </Box>
    )
}
