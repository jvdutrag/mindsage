import { useSnackbar, VariantType } from 'notistack'
import { Fade } from '@mui/material'

export function useAlert(): (message: string, variant: VariantType) => void {
    const { enqueueSnackbar } = useSnackbar()

    const alert = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, {
            variant,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            },
            autoHideDuration: 3000,
            TransitionComponent: Fade,
            disableWindowBlurListener: true
        })
    }

  return alert
}
