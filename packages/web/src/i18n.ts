import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import { Language } from './models'

import portuguese from './locale/pt.json'
import english from './locale/en.json'
import spanish from './locale/es.json'

const resources = {
    [Language.PORTUGUESE]: {
        translation: portuguese
    },
    [Language.ENGLISH]: {
        translation: english
    },
    [Language.SPANISH]: {
        translation: spanish
    }
}

i18n.use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || Language.PORTUGUESE,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n