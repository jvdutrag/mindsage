import { Typography, Box } from '@mui/material'

export default function EnglishTerms({ updateDate }: { updateDate: string }) {
    return (
        <Box>
            <Box>
                <Typography variant="h5">
                    Terms of Use
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    These terms of use were last updated on {updateDate}
                </Typography>
            </Box>
            <hr></hr>
            <Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    "MindSage," hereinafter also referred to as "we," "our," or "us," is a platform that provides mental health support to users through services
                    using artificial intelligence technology.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                    Do not use this service for emergency medical needs. If you are experiencing a medical emergency, please call
                    911 or your local emergency number. If you are experiencing a mental health crisis,
                    please call a helpline specific to your country or visit the website <a href="https://findahelpline.com/i/iasp" target="_blank" rel="noreferrer">https://findahelpline.com/i/iasp</a> for more information.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                    If you are considering suicide or believe that you or someone else is in danger or may cause harm to oneself or others,
                    or if you have any medical emergency, we urge all users of this platform to immediately contact the relevant emergency service number mentioned earlier, notify the authorities, and seek immediate assistance in person.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    By accessing and/or using the platform called "MindSage," you agree to comply with the terms described below and
                    all applicable laws and regulations. If you do not agree with these terms, we recommend that you do not use the platform.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    We use an established machine learning model in the market called "Chat GPT" from OpenAI. We are not affiliated with OpenAI or any
                    other similar product or service. We are not affiliated with any medical entity, clinic, hospital, healthcare professional, or council.
                    We do not provide health services, medical diagnoses, treatments, or medical advice. We do not replace the assessment of a healthcare professional, and we encourage
                    you to use the platform only after receiving an appropriate professional diagnosis.
                    We do not provide emergency or crisis services. We are not a helpline for suicide prevention, violence, or abuse of any kind.
                    We use technology to provide support in the mental health routines of our users and do not replace the assessment of a certified healthcare professional.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    As we use machine learning, the platform may not be 100% accurate, so we do not recommend that you make decisions based solely on
                    the information provided by the platform. Always consult a mental health professional before making any decisions, such as a psychiatrist,
                    psychologist, therapist, or similar. We are not responsible for any decisions made based on the information provided by the platform.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    To access MindSage, you need to have a Google or Apple account. By using either of the mentioned authentications, you agree
                    to provide accurate and up-to-date information and to protect your login credentials.
                    You are responsible for all activities that occur under your MindSage account.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    The privacy of our users is important to us. MindSage collects, stores, and processes personal information in accordance with our Privacy Policy.
                    By using the platform, you agree to the collection, storage, and processing of your personal information as described in the Privacy Policy.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    You agree to use MindSage only for lawful purposes and in accordance with these terms of use. You may not use the platform in a way that could harm,
                    disable, overload, or compromise the functionality of the platform or interfere with other users' use. Additionally, you agree not to use
                    "MindSage" to send or transmit any illegal, harmful, threatening, abusive, defamatory, obscene, offensive, invasive of others' privacy, or infringing third-party intellectual property rights.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    MindSage and all its content, including but not limited to text, graphics, logos, images, videos, audios, and software, are protected by copyright and intellectual property laws. You are not allowed to modify, reproduce, distribute, transmit,
                    publicly display, create derivative works, or otherwise exploit MindSage's content unless expressly
                    authorized in writing by the owners.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    MindSage may be updated or modified periodically to enhance platform functionality and security. We reserve the right to make
                    changes, add or remove features and functionalities at any time without prior notice.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    The use of MindSage is at your own risk. The platform is provided "as is" without warranties of any kind. We are not liable for
                    any direct, indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use MindSage.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    These terms of use constitute the entire agreement between you and MindSage regarding the use of the platform. If any provision of these terms is deemed
                    invalid or unenforceable, the remaining provisions will remain in full force and effect. Any waiver of any provision of these terms will only be effective
                    if made in writing and signed by MindSage.
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    By using MindSage, you agree to these terms of use. If you have any questions about these terms, please contact us via email at contact@mindsage.app.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Thank you for choosing MindSage, and we hope you enjoy the platform experience!
                </Typography>
            </Box>
        </Box>
    )
}
