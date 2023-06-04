import { useState } from 'react'
import { FormControl, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

type ChatInputProps = {
    onSubmit: (text: string) => void
}

export default function ChatInput({ onSubmit }: ChatInputProps) {
    const [value, setValue] = useState('')

    const validateBeforeSubmit = () => {
        onSubmit(value.trim())
        setValue('')
    }

    const { t } = useTranslation()

    return (
        <FormControl variant="outlined" fullWidth>
            <OutlinedInput
                type="text"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={() => validateBeforeSubmit()} edge="end">
                            <SendIcon color="primary" />
                        </IconButton>
                    </InputAdornment>
                }
                placeholder={String(t('chat.box.inputPlaceholder'))}
                fullWidth
                sx={{ '& fieldset': { border: 'none' } }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        validateBeforeSubmit()
                    }
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
            />
        </FormControl>
    )
}
