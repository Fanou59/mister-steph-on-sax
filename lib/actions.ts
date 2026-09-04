'use server'

import { z } from 'zod'
import { contactFormMessages } from '@/lib/content'
import { sendContactEmails } from '@/lib/resend'
import {
  HONEYPOT_FIELD_NAME,
  contactFormSchema,
} from '@/lib/validation'

// The non-honeypot fields, echoed back on any error so the Client Component
// can redisplay what the visitor already typed. React resets uncontrolled
// `<form>` fields after every action call (mirroring native form-reset
// behavior) — without echoing these back as `defaultValue`, a visitor who
// hits a validation or technical error would see every field wiped and
// have to retype the whole form, which EXPERIENCE.md explicitly rules out
// for the technical-error case and is just as true for validation errors.
export type SubmittedValues = Record<
  'nom' | 'prenom' | 'email' | 'date' | 'typePrestation' | 'lieu',
  string
>

// AD-3 — the exact discriminated return shape shared by the Client
// Component (useActionState) and this Server Action.
export type ContactFormState =
  | { ok: true }
  | {
      ok: false
      kind: 'validation'
      fieldErrors: Record<string, string>
      values: SubmittedValues
    }
  | { ok: false; kind: 'technical'; message: string; values: SubmittedValues }

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

  const values: SubmittedValues = {
    nom: raw.nom,
    prenom: raw.prenom,
    email: raw.email,
    date: raw.date,
    typePrestation: raw.typePrestation,
    lieu: raw.lieu,
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
    return { ok: false, kind: 'validation', fieldErrors, values }
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
      values,
    }
  }

  return { ok: true }
}
