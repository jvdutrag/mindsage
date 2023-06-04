import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#8f8ac3',
            paper: '#fff'
        },
        primary: {
            light: '#e4e3ff',
            200: '#c1bef6',
            main: '#9995ef',
            dark: '#7573CA',
            700: '#5154A6',
            900: '#2C3683',
            contrastText: '#fff'
        },
        secondary: {
            light: '#f9e7f6',
            200: '#e2bddc',
            main: '#ce96c5',
            dark: '#a978a1',
            700: '#855f7f',
            900: '#754b6e',
            contrastText: '#fff'
        },
        info: {
            light: '#fff',
            main: '#fff',
            dark: '#ededed',
            contrastText: '#9995ef'
        },
        success: {
            light: '#B9F6CA',
            200: '#69F0AE',
            main: '#00E676',
            dark: '#00C853',
            700: '#009624'
        },
        error: {
            light: '#EF9A9A',
            main: '#F44336',
            dark: '#C62828',
            700: '#B71C1C'
        },
        warning: {
            light: '#FFF8E1',
            main: '#FFE57F',
            dark: '#FFC107',
            700: '#FFA000'
        }
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        button: {
            textTransform: 'none'
        },
        h3: {
            fontFamily: 'Roboto Slab, sans-serif'
        },
        h5: {
            fontFamily: 'Roboto Slab, sans-serif'
        }
    }
})

export default theme
