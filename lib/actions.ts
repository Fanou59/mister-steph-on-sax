'use server'

import { z } from 'zod'
import { contactFormMessages } from '@/lib/content'
import { sendContactEmails } from '@/lib/resend'
import {
  HONEYPOT_FIELD_NAME,
  contactFormSchema,
} from '@/lib/validation'

// AD-3 — the exact discriminated return shape shared by the Client
// Component (useActionState) and this Server Action.
export type ContactFormState =
  | { ok: true }
  | { ok: false; kind: 'validation'; fieldErrors: Record<string, string> }
  | { ok: false; kind: 'technical'; message: string }

function getStringField(formData: FormData, name: string): string {
  const value = formData.get(name)
  return typeof value === 'string' ? value : ''
}

/**
 * AD-2 — the only submission path for the contact form: a Server Action
 * passed to useActionState, never a fetch to a dedicated API route.
 */
export async function submitContactForm(
  _prevState: ContactFormState | undefined,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    nom: getStringField(formData, 'nom'),
    prenom: getStringField(formData, 'prenom'),
    email: getStringField(formData, 'email'),
    date: getStringField(formData, 'date'),
    typePrestation: getStringField(formData, 'typePrestation'),
    lieu: getStringField(formData, 'lieu'),
    [HONEYPOT_FIELD_NAME]: getStringField(formData, HONEYPOT_FIELD_NAME),
  }

  // AD-8 — honeypot checked first, ahead of validation. A human never fills
  // this hidden field; a bot that does gets a silent, indistinguishable
  // success with no email sent.
  if (raw[HONEYPOT_FIELD_NAME].trim() !== '') {
    return { ok: true }
  }

  // AD-3 — revalidate with the same Zod schema server-side, even though the
  // client already validated on blur. Never trust the client alone.
  const parsed = contactFormSchema.safeParse(raw)

  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error)
    const fieldErrors: Record<string, string> = {}
    for (const [field, messages] of Object.entries(flattened.fieldErrors)) {
      const [firstMessage] = messages ?? []
      if (firstMessage) {
        fieldErrors[field] = firstMessage
      }
    }
    return { ok: false, kind: 'validation', fieldErrors }
  }

  // Honeypot field stripped — it never leaves this function, real or fake.
  const { nom, prenom, email, date, typePrestation, lieu } = parsed.data

  // AD-4 — notification is sent first and blocks success; confirmation is
  // best-effort and handled entirely inside sendContactEmails.
  const result = await sendContactEmails({
    nom,
    prenom,
    email,
    date,
    typePrestation,
    lieu,
  })

  if (!result.sent) {
    return {
      ok: false,
      kind: 'technical',
      message: contactFormMessages.technicalError,
    }
  }

  return { ok: true }
}
