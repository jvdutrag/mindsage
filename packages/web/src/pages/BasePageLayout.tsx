import { Container } from '@mui/material'

import { Header, Footer } from '../components'

export default function BasePageLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth="xl">
            <Header />
            {children}
            <Footer />
        </Container>
    )
}
