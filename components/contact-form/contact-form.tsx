'use client'

import type { FocusEvent, RefObject } from 'react'
import { useActionState, useEffect, useRef, useState } from 'react'
import { submitContactForm, type ContactFormState } from '@/lib/actions'
import {
  contactFormSchema,
  HONEYPOT_FIELD_NAME,
  type ContactFormFieldName,
} from '@/lib/validation'
import {
  contactFormLabels,
  contactFormMessages,
  contactSection,
  prestationTypes,
} from '@/lib/content'

// AD-1 — the only Client island on the page. Everything below (including the
// success/error live regions) lives in this one file, receives its state as
// props/closures, and holds no state of its own outside this component.

const initialState: ContactFormState | undefined = undefined

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  )

  // Per-field errors from the visitor's own blur-time validation (shared Zod
  // schema, AD-3). Merged with the Server Action's fieldErrors below — never
  // mirrored into a second copy of the server result via an effect.
  const [blurErrors, setBlurErrors] = useState<
    Partial<Record<ContactFormFieldName, string>>
  >({})

  const submitFieldErrors =
    state?.ok === false && state.kind === 'validation'
      ? state.fieldErrors
      : undefined

  const fieldErrors: Partial<Record<ContactFormFieldName, string>> = {
    ...submitFieldErrors,
    ...blurErrors,
  }

  const nomRef = useRef<HTMLInputElement>(null)
  const prenomRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const typePrestationRef = useRef<HTMLSelectElement>(null)
  const lieuRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // EXPERIENCE.md § State Patterns — focus moves to the first invalid field
  // only as a result of a *submit*, and the success message receives focus
  // when it appears. Blur-time validation (below) never touches focus.
  useEffect(() => {
    if (!state) return

    if (state.ok === false && state.kind === 'validation') {
      if (state.fieldErrors.nom) {
        nomRef.current?.focus()
      } else if (state.fieldErrors.prenom) {
        prenomRef.current?.focus()
      } else if (state.fieldErrors.email) {
        emailRef.current?.focus()
      } else if (state.fieldErrors.date) {
        dateRef.current?.focus()
      } else if (state.fieldErrors.typePrestation) {
        typePrestationRef.current?.focus()
      } else if (state.fieldErrors.lieu) {
        lieuRef.current?.focus()
      }
    }

    if (state.ok === true) {
      successRef.current?.focus()
    }
  }, [state])

  function validateField(field: ContactFormFieldName, value: string) {
    const result = contactFormSchema.shape[field].safeParse(value)
    setBlurErrors((previous) => ({
      ...previous,
      [field]: result.success
        ? undefined
        : (result.error.issues[0]?.message ?? ''),
    }))
  }

  if (state?.ok === true) {
    return (
      <section
        id="contact"
        className="border-t border-border bg-surface-card px-gutter-mobile py-section-y md:px-gutter-desktop"
      >
        <div className="mx-auto max-w-xl">
          <div
            ref={successRef}
            role="status"
            tabIndex={-1}
            className="rounded-md border border-border bg-surface p-6 outline-none"
          >
            <h2 className="mb-2 font-display text-h3 text-ink">
              {contactFormMessages.success.heading}
            </h2>
            <p className="font-sans text-body-sm text-ink-soft">
              {contactFormMessages.success.body}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="border-t border-border bg-surface-card px-gutter-mobile py-section-y md:px-gutter-desktop"
    >
      <div className="mx-auto max-w-xl">
        <p className="mb-3 font-sans text-eyebrow uppercase text-ink">
          {contactSection.eyebrow}
        </p>
        <h2 className="mb-6 max-w-[22ch] font-display text-h2">
          {contactSection.heading}
        </h2>

        <form
          action={formAction}
          noValidate
          className="flex flex-col gap-form-field-gap"
        >
          <div className="grid gap-form-field-gap md:grid-cols-2">
            <Field
              id="nom"
              name="nom"
              label={contactFormLabels.nom}
              type="text"
              inputRef={nomRef}
              error={fieldErrors.nom}
              onBlur={(event) => validateField('nom', event.target.value)}
            />
            <Field
              id="prenom"
              name="prenom"
              label={contactFormLabels.prenom}
              type="text"
              inputRef={prenomRef}
              error={fieldErrors.prenom}
              onBlur={(event) => validateField('prenom', event.target.value)}
            />
          </div>

          <Field
            id="email"
            name="email"
            label={contactFormLabels.email}
            type="email"
            inputRef={emailRef}
            error={fieldErrors.email}
            onBlur={(event) => validateField('email', event.target.value)}
          />

          <Field
            id="date"
            name="date"
            label={contactFormLabels.date}
            type="date"
            inputRef={dateRef}
            error={fieldErrors.date}
            onBlur={(event) => validateField('date', event.target.value)}
          />

          <div>
            <label
              htmlFor="typePrestation"
              className="mb-1 block font-sans text-label text-ink"
            >
              {contactFormLabels.typePrestation}
            </label>
            <select
              id="typePrestation"
              name="typePrestation"
              ref={typePrestationRef}
              defaultValue=""
              aria-invalid={fieldErrors.typePrestation ? true : undefined}
              aria-describedby={
                fieldErrors.typePrestation ? 'typePrestation-error' : undefined
              }
              onBlur={(event) =>
                validateField('typePrestation', event.target.value)
              }
              className={`min-h-11 w-full rounded-sm border bg-surface-card px-3 py-2.5 font-sans text-body text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                fieldErrors.typePrestation
                  ? 'border-error'
                  : 'border-border-strong'
              }`}
            >
              <option value="">— Sélectionnez —</option>
              {prestationTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldErrors.typePrestation && (
              <p
                id="typePrestation-error"
                className="mt-1 font-sans text-body-sm text-error"
              >
                {fieldErrors.typePrestation}
              </p>
            )}
          </div>

          <Field
            id="lieu"
            name="lieu"
            label={contactFormLabels.lieu}
            type="text"
            inputRef={lieuRef}
            error={fieldErrors.lieu}
            onBlur={(event) => validateField('lieu', event.target.value)}
          />

          {/* AD-8 — honeypot. Visually and semantically hidden; part of the
              same Zod schema (lib/validation.ts) and checked first inside
              the Server Action (lib/actions.ts). A human never reaches it. */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor={HONEYPOT_FIELD_NAME}>Laissez ce champ vide</label>
            <input
              id={HONEYPOT_FIELD_NAME}
              name={HONEYPOT_FIELD_NAME}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {state?.ok === false && state.kind === 'technical' && (
            <p role="alert" className="font-sans text-body-sm text-error">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            aria-disabled={isPending}
            aria-busy={isPending}
            onClick={(event) => {
              if (isPending) {
                event.preventDefault()
              }
            }}
            className="min-h-11 self-start rounded-sm bg-gold px-8 py-3.5 font-sans text-button text-on-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            {isPending
              ? contactFormMessages.submitPending
              : contactFormLabels.submit}
          </button>
        </form>
      </div>
    </section>
  )
}

interface FieldProps {
  id: string
  name: string
  label: string
  type: 'text' | 'email' | 'date'
  inputRef: RefObject<HTMLInputElement | null>
  error?: string
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
}

function Field({ id, name, label, type, inputRef, error, onBlur }: FieldProps) {
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-sans text-label text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        ref={inputRef}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onBlur={onBlur}
        className={`min-h-11 w-full rounded-sm border bg-surface-card px-3 py-2.5 font-sans text-body text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
          error ? 'border-error' : 'border-border-strong'
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1 font-sans text-body-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}
