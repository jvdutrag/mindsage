import { Typography, Box } from '@mui/material'

export default function EnglishPrivacy({ updateDate }: { updateDate: string }) {
    return (
        <Box>
            <Box>
                <Typography variant="h5">
                    Privacy Policy
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    This policy was last updated on {updateDate}
                </Typography>
            </Box>
            <hr></hr>
            <Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Thank you for choosing the MindSage platform ("we," "our," or "platform") as your platform for mental health care. In this Privacy Policy, we will explain how we collect, use, store, and share personal information of MindSage platform users. By using our platform, you agree to this policy.
                </Typography>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        1. Information We Collect
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        To provide our services, you will sign up with a Google or Apple account. From that account, we only collect your name and email address. We do not collect any other personal information from you during registration. After registration, you may provide additional personal information such as your name, date of birth, gender, and other personal and health information.
                    </Typography>
                    <ul>
                        <li>
                            Email Address: We collect your email address to uniquely identify you and provide access to your MindSage platform account.
                        </li>
                        <li>
                            Name: We collect your name to personalize your experience and communicate with you in a more personalized manner.
                        </li>
                        <li>
                            Date of Birth: We collect your date of birth to ensure that you are old enough to use the platform in accordance with legal requirements.
                        </li>
                        <li>
                            Gender: We collect your gender to personalize platform recommendations and features based on your individual preferences.
                        </li>
                        <li>
                            IP Address: We collect your IP address for security purposes, fraud prevention, and to improve our services.
                        </li>
                        <li>
                            Device Type: We collect information about the type of device you are using to access the MindSage platform in order to optimize the user experience and provide appropriate technical support.
                        </li>
                    </ul>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        2. Use of Information
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        We use the collected information for the following purposes:
                    </Typography>
                    <ul>
                        <li>
                            Provide and personalize our services: We use your information to provide access to the MindSage platform and personalize the experience based on your preferences and needs.
                        </li>
                        <li>
                            Communication: We use your email address and name to communicate with you, provide updates about the platform, send relevant notifications, and respond to requests and inquiries.
                        </li>
                        <li>
                            Analysis and Improvement: We use the information to analyze platform performance, identify trends, improve our services, develop new features, and ensure the security and functionality of the MindSage platform.
                        </li>
                        <li>
                            Legal Compliance: We may use the information to fulfill legal obligations, such as responding to requests from government authorities, enforcing our terms of use, and protecting our rights and property.
                        </li>
                    </ul>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        3. Sharing of Information
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        We do not share your personal information with third parties except in the following circumstances:
                    </Typography>
                    <ul>
                        <li>
                            Service Partners: We may share your information with third-party service providers who assist us in operating the MindSage platform, such as hosting providers, payment processors, data analysis, and support services.
                        </li>
                        <li>
                            Consent: We may share your information with third parties if you provide explicit consent for such sharing.
                        </li>
                        <li>
                            Legal Compliance: We may share your information if required by law, court order, or to comply with valid legal requests.
                        </li>
                    </ul>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        4. Storage and Security
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        We store your personal information on secure servers provided by Google and take reasonable measures to protect your information against unauthorized access, disclosure, alteration, or destruction. However, please note that no method of internet transmission or electronic storage is fully secure.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        5. Data Retention
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        We will retain your personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy unless a longer retention period is required or permitted by law.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        6. Your Rights
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        You have the right to access, correct, update, or delete your personal information. If you wish to exercise these rights, please contact us through the channels provided at the end of this policy. We will make reasonable efforts to respond to your requests as soon as possible.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        7. Minors
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        The MindSage platform is not intended for individuals under the age of 18. If you are a parent or legal guardian of a minor and believe that they have provided us with personal information, please contact us so that we can remove that information from our records.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        8. Changes to this Privacy Policy
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        We may update this Privacy Policy periodically to reflect changes in our privacy practices. We recommend that you review this policy regularly to stay informed about how we are protecting your information.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        9. Contact
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us via email at contact@mindsage.app.
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Thank you for using the MindSage platform and trusting us to assist with your mental health.
                </Typography>
            </Box>
        </Box>
    )
}
