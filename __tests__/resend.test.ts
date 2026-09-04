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
