import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from 'react-email'
import { notificationEmailContent } from '@/lib/content'
import type { ContactFormValues } from '@/lib/validation'
import { prestationTypes } from '@/lib/content'

export interface NotificationEmailProps {
  nom: string
  prenom: string
  email: string
  telephone: string
  date: string
  typePrestation: ContactFormValues['typePrestation']
  lieu: string
  message: string
}

function prestationLabel(value: string): string {
  return prestationTypes.find((p) => p.value === value)?.label ?? value
}

export default function NotificationEmail({
  nom,
  prenom,
  email,
  telephone,
  date,
  typePrestation,
  lieu,
  message,
}: NotificationEmailProps) {
  const { heading, intro, fieldLabels } = notificationEmailContent

  return (
    <Html lang="fr">
      <Head />
      <Preview>{notificationEmailContent.subject(nom, prenom)}</Preview>
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
          <Text>{intro}</Text>
          <Hr />
          <Text>
            <strong>{fieldLabels.nom} :</strong> {nom}
          </Text>
          <Text>
            <strong>{fieldLabels.prenom} :</strong> {prenom}
          </Text>
          <Text>
            <strong>{fieldLabels.email} :</strong> {email}
          </Text>
          <Text>
            <strong>{fieldLabels.telephone} :</strong> {telephone}
          </Text>
          <Text>
            <strong>{fieldLabels.date} :</strong> {date}
          </Text>
          <Text>
            <strong>{fieldLabels.typePrestation} :</strong>{' '}
            {prestationLabel(typePrestation)}
          </Text>
          <Text>
            <strong>{fieldLabels.lieu} :</strong> {lieu}
          </Text>
          {message && (
            <Text style={{ whiteSpace: 'pre-wrap' }}>
              <strong>{fieldLabels.message} :</strong> {message}
            </Text>
          )}
        </Container>
      </Body>
    </Html>
  )
}
