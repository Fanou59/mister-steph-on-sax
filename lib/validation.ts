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
  telephone: z
    .string()
    .trim()
    .min(1, contactFormMessages.validation.telephone)
    .regex(
      /^(?:(?:\+33|0033)[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/,
      contactFormMessages.validation.telephone,
    ),
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
  // Free-text, optional. Only ever rendered as plain text (React Email
  // <Text> escapes it automatically — never dangerouslySetInnerHTML), so
  // the one real risk here is an oversized payload, capped below.
  message: z
    .string()
    .trim()
    .max(2000, contactFormMessages.validation.message)
    .optional()
    .default(''),
  [HONEYPOT_FIELD_NAME]: z.string().optional().default(''),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export type ContactFormFieldName = Exclude<
  keyof ContactFormValues,
  typeof HONEYPOT_FIELD_NAME
>

// The validated payload, honeypot field stripped — what actually gets emailed.
export type ContactSubmission = Omit<ContactFormValues, typeof HONEYPOT_FIELD_NAME>
