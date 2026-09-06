import { Resend } from 'resend'
import NotificationEmail from '@/emails/notification-email'
import ConfirmationEmail from '@/emails/confirmation-email'
import { confirmationEmailContent, notificationEmailContent } from '@/lib/content'
import type { ContactSubmission } from '@/lib/validation'

// AD-4 — no real email leaves this app outside Production, so Preview
// deployments stay testable without spamming Stephane's real inbox.
const isProduction = process.env.VERCEL_ENV === 'production'

export type SendContactEmailsResult =
  | { sent: true }
  | { sent: false; message: string }

/**
 * AD-4 — two distinct resend.emails.send() calls, never resend.batch.send()
 * (a batch is atomic: one bad email would fail the whole batch, including
 * the notification). The notification to Stephane goes first and blocks the
 * submission's success; the confirmation to the visitor is best-effort.
 */
export async function sendContactEmails(
  values: ContactSubmission,
): Promise<SendContactEmailsResult> {
  if (!isProduction) {
    console.log(
      '[contact] Non-production environment — no email sent. Payload:',
      values,
    )
    return { sent: true }
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM_EMAIL
  const toAddress = process.env.CONTACT_TO_EMAIL

  if (!apiKey || !fromAddress || !toAddress) {
    console.error(
      '[contact] Missing RESEND_API_KEY, RESEND_FROM_EMAIL or CONTACT_TO_EMAIL environment variable.',
    )
    return {
      sent: false,
      message: 'Configuration email manquante côté serveur.',
    }
  }

  // AD-4 — the client is constructed here, lazily, only once the env is
  // confirmed Production and every required variable is present. The
  // Resend SDK's constructor validates its argument and throws immediately
  // when it's missing — building this at module scope would crash every
  // import of this file (including in local dev and tests) whenever
  // RESEND_API_KEY isn't set, regardless of the isProduction gate above.
  const resend = new Resend(apiKey)

  // 1. Notification to Stephane — blocking. Its failure fails the submission.
  // Wrapped in try/catch (mirroring the confirmation call below) because a
  // network failure or bad API key can reject/throw rather than resolve
  // with `.error` — without this, that failure mode would propagate
  // unhandled instead of producing the spec's `kind: 'technical'` contract.
  try {
    const notification = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject: notificationEmailContent.subject(values.nom, values.prenom),
      react: NotificationEmail({
        nom: values.nom,
        prenom: values.prenom,
        email: values.email,
        telephone: values.telephone,
        date: values.date,
        typePrestation: values.typePrestation,
        lieu: values.lieu,
        message: values.message,
      }),
    })

    if (notification.error) {
      console.error('[contact] Notification email failed:', notification.error)
      return { sent: false, message: notification.error.message }
    }
  } catch (error) {
    console.error('[contact] Notification email threw:', error)
    return {
      sent: false,
      message: error instanceof Error ? error.message : String(error),
    }
  }

  // 2. Confirmation to the visitor — best-effort. A failure here is logged
  // but must never fail the submission (the visitor already sees success).
  try {
    const confirmation = await resend.emails.send({
      from: fromAddress,
      to: values.email,
      subject: confirmationEmailContent.subject,
      react: ConfirmationEmail({ prenom: values.prenom }),
    })

    if (confirmation.error) {
      console.error(
        '[contact] Confirmation email failed:',
        confirmation.error,
      )
    }
  } catch (error) {
    console.error('[contact] Confirmation email threw:', error)
  }

  return { sent: true }
}
