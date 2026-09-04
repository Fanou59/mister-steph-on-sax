import { Body, Container, Head, Heading, Html, Preview, Text } from 'react-email'
import { confirmationEmailContent } from '@/lib/content'

export interface ConfirmationEmailProps {
  prenom: string
}

export default function ConfirmationEmail({ prenom }: ConfirmationEmailProps) {
  const { subject, heading, body, signature } = confirmationEmailContent

  return (
    <Html lang="fr">
      <Head />
      <Preview>{subject}</Preview>
      <Body style={{ backgroundColor: '#F8F6F0', fontFamily: 'Inter, sans-serif' }}>
        <Container
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #8C8268',
            borderRadius: '8px',
            padding: '24px',
            color: '#1C2541',
          }}
        >
          <Heading as="h2" style={{ color: '#1C2541' }}>
            {heading}
          </Heading>
          <Text>Bonjour {prenom},</Text>
          <Text>{body}</Text>
          <Text>{signature}</Text>
        </Container>
      </Body>
    </Html>
  )
}
