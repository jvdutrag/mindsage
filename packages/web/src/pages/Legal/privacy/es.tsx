import { Typography, Box } from '@mui/material'

export default function SpanishPrivacy({ updateDate }: { updateDate: string }) {
    return (
        <Box>
            <Box>
                <Typography variant="h5">
                    Política de privacidad
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Esta política fue actualizada por última vez el {updateDate}
                </Typography>
            </Box>
            <hr></hr>
            <Box>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Gracias por elegir la plataforma MindSage ("nosotros", "nuestro" o "plataforma") como tu plataforma de atención de salud mental. En esta Política de privacidad, explicaremos cómo recopilamos, usamos, almacenamos y compartimos la información personal de los usuarios de la plataforma MindSage. Al utilizar nuestra plataforma, aceptas esta política.
                </Typography>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        1. Información que recopilamos
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Para proporcionar nuestros servicios, deberás registrarte con una cuenta de Google o Apple. A partir de esa cuenta, solo recopilamos tu nombre y dirección de correo electrónico. No recopilamos ninguna otra información personal tuya durante el registro. Después del registro, puedes proporcionar información personal adicional, como tu nombre, fecha de nacimiento, género y otra información personal y de salud.
                    </Typography>
                    <ul>
                        <li>
                            Dirección de correo electrónico: Recopilamos tu dirección de correo electrónico para identificarte de manera única y proporcionar acceso a tu cuenta de la plataforma MindSage.
                        </li>
                        <li>
                            Nombre: Recopilamos tu nombre para personalizar tu experiencia y comunicarnos contigo de manera más personalizada.
                        </li>
                        <li>
                            Fecha de nacimiento: Recopilamos tu fecha de nacimiento para asegurarnos de que tienes la edad suficiente para utilizar la plataforma de acuerdo con los requisitos legales.
                        </li>
                        <li>
                            Género: Recopilamos tu género para personalizar las recomendaciones y características de la plataforma según tus preferencias individuales.
                        </li>
                        <li>
                            Dirección IP: Recopilamos tu dirección IP por motivos de seguridad, prevención de fraudes y para mejorar nuestros servicios.
                        </li>
                        <li>
                            Tipo de dispositivo: Recopilamos información sobre el tipo de dispositivo que utilizas para acceder a la plataforma MindSage con el fin de optimizar la experiencia del usuario y proporcionar soporte técnico adecuado.
                        </li>
                    </ul>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        2. Uso de la información
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Utilizamos la información recopilada para los siguientes fines:
                    </Typography>
                    <ul>
                        <li>
                            Proporcionar y personalizar nuestros servicios: Utilizamos tu información para proporcionar acceso a la plataforma MindSage y personalizar la experiencia según tus preferencias y necesidades.
                        </li>
                        <li>
                            Comunicación: Utilizamos tu dirección de correo electrónico y nombre para comunicarnos contigo, proporcionar actualizaciones sobre la plataforma, enviar notificaciones relevantes y responder a solicitudes e inquietudes.
                        </li>
                        <li>
                            Análisis y mejora: Utilizamos la información para analizar el rendimiento de la plataforma, identificar tendencias, mejorar nuestros servicios, desarrollar nuevas funciones y garantizar la seguridad y funcionalidad de la plataforma MindSage.
                        </li>
                        <li>
                            Cumplimiento legal: Podemos utilizar la información para cumplir con obligaciones legales, como responder a solicitudes de autoridades gubernamentales, hacer cumplir nuestros términos de uso y proteger nuestros derechos y propiedades.
                        </li>
                    </ul>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        3. Compartir la información
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
                    </Typography>
                    <ul>
                        <li>
                            Socios de servicios: Podemos compartir tu información con proveedores de servicios externos que nos ayudan a operar la plataforma MindSage, como proveedores de alojamiento, procesadores de pagos, análisis de datos y servicios de soporte.
                        </li>
                        <li>
                            Consentimiento: Podemos compartir tu información con terceros si otorgas un consentimiento explícito para dicho intercambio.
                        </li>
                        <li>
                            Cumplimiento legal: Podemos compartir tu información si así lo exige la ley, una orden judicial o para cumplir con solicitudes legales válidas.
                        </li>
                    </ul>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        4. Almacenamiento y seguridad
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Almacenamos tu información personal en servidores seguros proporcionados por Google y tomamos medidas razonables para proteger tu información contra el acceso no autorizado, la divulgación, la alteración o la destrucción. Sin embargo, ten en cuenta que ningún método de transmisión por Internet o almacenamiento electrónico es completamente seguro.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        5. Retención de datos
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Conservaremos tu información personal solo durante el tiempo necesario para cumplir con los fines descritos en esta Política de privacidad, a menos que la ley requiera o permita un período de retención más largo.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        6. Tus derechos
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Tienes derecho a acceder, corregir, actualizar o eliminar tu información personal. Si deseas ejercer estos derechos, contáctanos a través de los canales proporcionados al final de esta política. Haremos todo lo posible para responder a tus solicitudes lo antes posible.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        7. Menores
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        La plataforma MindSage no está destinada a personas menores de 18 años. Si eres padre, madre o tutor legal de un menor y crees que nos ha proporcionado información personal, contáctanos para que podamos eliminar esa información de nuestros registros.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        8. Cambios en esta Política de privacidad
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Podemos actualizar esta Política de privacidad periódicamente para reflejar cambios en nuestras prácticas de privacidad. Recomendamos que revises esta política regularmente para estar informado sobre cómo protegemos tu información.
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: 18 }}>
                        9. Contacto
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Si tienes alguna pregunta, inquietud o solicitud con respecto a esta Política de privacidad, contáctanos por correo electrónico a contact@mindsage.app.
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Gracias por utilizar la plataforma MindSage y confiar en nosotros para ayudarte con tu salud mental.
                </Typography>
            </Box>
        </Box>
    )
}
