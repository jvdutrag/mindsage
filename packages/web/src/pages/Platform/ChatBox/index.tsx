import { useEffect, useRef } from 'react'
import { Grid, Avatar, Typography, Button, Box, LinearProgress, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { MessageBox } from 'react-chat-elements'
import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import 'moment/locale/pt-br'
import 'react-chat-elements/dist/main.css'

import { ChatPayload, Message, Session } from '../../../types'
import { useAlert, useUser, useAuthenticatedSocket } from '../../../hooks'
import { ChatInput } from '../../../components'
import { sessionSlice } from '../../../features'
import { authApiSlice } from '../../../features/api'

import MindyAvatar from '../../../assets/mindy.png'

export default function ChatBox() {
    const messages = useSelector(sessionSlice.selectMessages)
    const session = useSelector(sessionSlice.selectSession)
    const isLoading = useSelector(sessionSlice.selectChatLoading)

    const bottomRef = useRef<HTMLDivElement>(null)

    const { t } = useTranslation()
    const user = useUser()
    const theme = useTheme()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { socket } = useAuthenticatedSocket()

    const [refresh] = authApiSlice.useRefreshMutation({ fixedCacheKey: 'shared-refresh' })

    const startConversation = () => {
        socket.emit('chat:start')
    }

    const onSubmitNewMessage = (text: string) => {
        const userMessage: Message = {
            content: text,
            sender: 'user',
            id: uuid(),
            sessionId: session.id
        }

        const payload: ChatPayload = {
            messages: messages.concat(userMessage)
        }

        dispatch(sessionSlice.addMessage(userMessage))
        dispatch(sessionSlice.setChatLoading(true))

        socket.emit('chat:message', payload)
    }

    useEffect(() => {
        socket.on('connect', () => {
            if (session) {
                socket.emit('chat:resume', session.id)
            }
        })

        socket.on('chat:started', (receivedSession: Session) => {
            dispatch(sessionSlice.setSession(receivedSession))

            const initialMessage: Message = {
                id: uuid(),
                sender: 'mindy',
                content: t('chat.box.initialMessage', {
                    name: user?.name
                }),
                sessionId: receivedSession.id
            }

            dispatch(sessionSlice.addMessage(initialMessage))
        })

        socket.on('chat:typing', (message: Message) => {
            dispatch(sessionSlice.incrementMessage(message))
        })

        socket.on('feedback', ({ type }) => {
            dispatch(sessionSlice.setChatLoading(false))

            switch(type) {
                case 'start-error': {
                    alert(t('feedback.errors.starting'), 'error')
                    break
                }
                case 'message-error': {
                    alert(t('feedback.errors.sending'), 'error')
                    break
                }
                case 'resume-error': {
                    alert(t('feedback.errors.loading'), 'error')
                    break
                }
            }
        })

        return () => {
            socket.off('connect')
            socket.off('feedback')
            socket.off('chat:started')
            socket.off('chat:typing')
        }
    }, [socket, dispatch, t, user?.name, alert, session])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' })
    }, [messages])

    if (!session) {
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
                    {t('chat.box.title', { name: user?.name })}
                </Typography>
                <Typography variant="body1" sx={{ width: { md: '400px', xs: undefined }, mb: 1 }}>
                    {t('chat.box.description')}
                </Typography>
                <Button color="primary" variant="contained" onClick={startConversation}>
                    {t('chat.box.button')}
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
                                    <Box sx={{ display: 'flex', m: 1 }} key={index}>
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
                                            text={<Typography dangerouslySetInnerHTML={{__html: message.content.replace(/\n/g, '<br />')}} />}
                                        />
                                    </Box>
                                )
                            } else {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            '.rce-mbox.rce-mbox-right': { backgroundColor: 'primary.light' },
                                            m: 1
                                        }}
                                    >
                                        <MessageBox
                                            position="right"
                                            type="text"
                                            key={index}
                                            style={{ backgroundColor: 'red' }}
                                            text={<Typography dangerouslySetInnerHTML={{__html: message.content.replace(/\n/g, '<br />')}} />}
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
                        <Grid item xs={12}>
                            <ChatInput onSubmit={onSubmitNewMessage} />
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}
