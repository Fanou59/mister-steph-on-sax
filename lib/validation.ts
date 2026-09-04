import { z } from 'zod'
import { prestationTypes, contactFormMessages } from './content'

/**
 * AD-8 — honeypot field. Part of the same schema as every other field;
 * checked inside the Server Action (lib/actions.ts). Never rendered in a
 * dedicated route or service — a filled honeypot returns success silently.
 */
export const HONEYPOT_FIELD_NAME = 'site_web' as const

// AD-3 — the "Type de prestation" enum is *derived* from lib/content.ts,
// never redeclared, so it can't drift from the options shown in the <select>.
const prestationValues = prestationTypes.map((p) => p.value) as [
  string,
  ...string[],
]

export const contactFormSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(1, contactFormMessages.validation.nom)
    .max(200, contactFormMessages.validation.nom),
  prenom: z
    .string()
    .trim()
    .min(1, contactFormMessages.validation.prenom)
    .max(200, contactFormMessages.validation.prenom),
  email: z
    .string()
    .trim()
    .min(1, contactFormMessages.validation.email)
    .email(contactFormMessages.validation.email),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, contactFormMessages.validation.date),
  typePrestation: z.enum(prestationValues, {
    error: contactFormMessages.validation.typePrestation,
  }),
  lieu: z
    .string()
    .trim()
    .min(1, contactFormMessages.validation.lieu)
    .max(200, contactFormMessages.validation.lieu),
  [HONEYPOT_FIELD_NAME]: z.string().optional().default(''),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export type ContactFormFieldName = Exclude<
  keyof ContactFormValues,
  typeof HONEYPOT_FIELD_NAME
>

// The validated payload, honeypot field stripped — what actually gets emailed.
export type ContactSubmission = Omit<ContactFormValues, typeof HONEYPOT_FIELD_NAME>
