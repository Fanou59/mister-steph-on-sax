import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the `resend` npm package itself (not `@/lib/resend`) so this test
// exercises `lib/resend.ts`'s own Production gating logic for real. If the
// gate ever failed and a real send were attempted, `emails.send` below
// would be called and this test would catch it — a real network call to
// Resend would also fail loudly in this sandboxed test environment.
const sendMock = vi.fn()

vi.mock('resend', () => {
  class Resend {
    emails = { send: sendMock }
  }
  return { Resend }
})

describe('sendContactEmails — Non-Production env (I/O & Edge-Case Matrix row 5)', () => {
  const originalVercelEnv = process.env.VERCEL_ENV

  beforeEach(() => {
    vi.resetModules()
    sendMock.mockReset()
  })

  afterEach(() => {
    if (originalVercelEnv === undefined) {
      delete process.env.VERCEL_ENV
    } else {
      process.env.VERCEL_ENV = originalVercelEnv
    }
  })

  it('returns { sent: true } without calling the Resend SDK when VERCEL_ENV is not "production"', async () => {
    delete process.env.VERCEL_ENV

    const { sendContactEmails } = await import('@/lib/resend')

    const result = await sendContactEmails({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      date: '2026-10-10',
      typePrestation: 'vin-honneur',
      lieu: 'Lyon',
    })

    expect(result).toEqual({ sent: true })
    expect(sendMock).not.toHaveBeenCalled()
  })
})

describe('sendContactEmails — Production env (AD-4 send contract)', () => {
  const original = {
    VERCEL_ENV: process.env.VERCEL_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  }

  const submission = {
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    date: '2026-10-10',
    typePrestation: 'vin-honneur',
    lieu: 'Lyon',
  }

  beforeEach(() => {
    vi.resetModules()
    sendMock.mockReset()
    process.env.VERCEL_ENV = 'production'
  })

  afterEach(() => {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  })

  it('returns { sent: false } and never calls Resend when RESEND_FROM_EMAIL/CONTACT_TO_EMAIL are missing', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    delete process.env.RESEND_FROM_EMAIL
    delete process.env.CONTACT_TO_EMAIL

    const { sendContactEmails } = await import('@/lib/resend')
    const result = await sendContactEmails(submission)

    expect(result.sent).toBe(false)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('returns { sent: false } and never constructs the Resend client when RESEND_API_KEY is missing — regression test: the client used to be built at module scope and crashed on import whenever this key was unset, in any environment, even before the isProduction gate ran', async () => {
    delete process.env.RESEND_API_KEY
    process.env.RESEND_FROM_EMAIL = 'contact@example.com'
    process.env.CONTACT_TO_EMAIL = 'stephane@example.com'

    const { sendContactEmails } = await import('@/lib/resend')
    const result = await sendContactEmails(submission)

    expect(result.sent).toBe(false)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('returns { sent: false } and skips the confirmation send when the notification send fails', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.RESEND_FROM_EMAIL = 'contact@example.com'
    process.env.CONTACT_TO_EMAIL = 'stephane@example.com'
    sendMock.mockResolvedValueOnce({
      data: null,
      error: { message: 'invalid_api_key' },
    })

    const { sendContactEmails } = await import('@/lib/resend')
    const result = await sendContactEmails(submission)

    expect(result).toEqual({ sent: false, message: 'invalid_api_key' })
    expect(sendMock).toHaveBeenCalledTimes(1)
  })

  it('still returns { sent: true } when the notification succeeds but the confirmation send throws', async () => {
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.RESEND_FROM_EMAIL = 'contact@example.com'
    process.env.CONTACT_TO_EMAIL = 'stephane@example.com'
    sendMock
      .mockResolvedValueOnce({ data: { id: 'notif-1' }, error: null })
      .mockRejectedValueOnce(new Error('network blip'))

    const { sendContactEmails } = await import('@/lib/resend')
    const result = await sendContactEmails(submission)

    expect(result).toEqual({ sent: true })
    expect(sendMock).toHaveBeenCalledTimes(2)
  })
})
