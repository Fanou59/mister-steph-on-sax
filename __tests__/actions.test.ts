import { beforeEach, describe, expect, it, vi } from 'vitest'
import { contactFormMessages } from '@/lib/content'
import { HONEYPOT_FIELD_NAME } from '@/lib/validation'

// Module-mock `@/lib/resend` so `submitContactForm`'s own branching logic
// (honeypot check, Zod revalidation, success/technical-error mapping) is
// what's under test here — not real email sending.
vi.mock('@/lib/resend', () => ({
  sendContactEmails: vi.fn(),
}))

import { submitContactForm } from '@/lib/actions'
import { sendContactEmails } from '@/lib/resend'

const sendContactEmailsMock = vi.mocked(sendContactEmails)

function buildFormData(
  overrides: Record<string, string> = {},
  omit: string[] = [],
): FormData {
  const values: Record<string, string> = {
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    date: '2026-10-10',
    typePrestation: 'vin-honneur',
    lieu: 'Lyon',
    ...overrides,
  }

  const formData = new FormData()
  for (const [key, value] of Object.entries(values)) {
    if (!omit.includes(key)) {
      formData.set(key, value)
    }
  }
  return formData
}

describe('submitContactForm — I/O & Edge-Case Matrix', () => {
  beforeEach(() => {
    sendContactEmailsMock.mockReset()
  })

  // Row 1 — Happy path
  it('returns { ok: true } when the form is valid and sendContactEmails succeeds', async () => {
    sendContactEmailsMock.mockResolvedValue({ sent: true })

    const result = await submitContactForm(undefined, buildFormData())

    expect(result).toEqual({ ok: true })
    expect(sendContactEmailsMock).toHaveBeenCalledTimes(1)
    expect(sendContactEmailsMock).toHaveBeenCalledWith({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      date: '2026-10-10',
      typePrestation: 'vin-honneur',
      lieu: 'Lyon',
    })
  })

  // Row 2 — Field validation error
  it('returns a validation error with a fieldErrors.date key when date is missing, without calling sendContactEmails', async () => {
    const result = await submitContactForm(
      undefined,
      buildFormData({}, ['date']),
    )

    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('expected ok: false')
    expect(result.kind).toBe('validation')
    if (result.kind !== 'validation') throw new Error('expected kind: validation')
    expect(result.fieldErrors).toHaveProperty('date')
    expect(sendContactEmailsMock).not.toHaveBeenCalled()
  })

  // Row 3 — Resend send fails
  it('returns a technical error when sendContactEmails resolves { sent: false }', async () => {
    sendContactEmailsMock.mockResolvedValue({
      sent: false,
      message: 'Resend API error',
    })

    const result = await submitContactForm(undefined, buildFormData())

    expect(result).toEqual({
      ok: false,
      kind: 'technical',
      message: contactFormMessages.technicalError,
    })
  })

  // Row 4 — Honeypot filled
  it('returns { ok: true } and never calls sendContactEmails when the honeypot field is filled', async () => {
    const result = await submitContactForm(
      undefined,
      buildFormData({ [HONEYPOT_FIELD_NAME]: 'im-a-bot' }),
    )

    expect(result).toEqual({ ok: true })
    expect(sendContactEmailsMock).not.toHaveBeenCalled()
  })
})
