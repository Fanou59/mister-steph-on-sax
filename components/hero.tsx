import { heroContent } from '@/lib/content'

// AD-1 — Server Component, static, no client JS shipped for this section.
export function Hero() {
  return (
    <section className="flex flex-col items-center bg-navy px-gutter-mobile py-section-y text-center text-on-navy md:px-gutter-desktop">
      <div
        aria-hidden="true"
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-gold"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          className="h-8 w-8 text-gold"
        >
          <path d="M14 8c0 6 0 10 4 13s10 2 10 8c0 3.5-2.8 6-6.2 6" />
          <circle cx="21.8" cy="35" r="2.1" />
          <circle cx="16" cy="11" r="1" />
          <circle cx="16" cy="15" r="1" />
        </svg>
      </div>

      <p className="mb-3 font-sans text-eyebrow uppercase text-gold">
        {heroContent.eyebrow}
      </p>
      <h1 className="max-w-[16ch] text-balance font-display text-h1">
        {heroContent.title}
      </h1>
      <p className="mt-4 max-w-[34ch] font-sans text-body text-on-navy-soft/85">
        {heroContent.subtitle}
      </p>
      <a
        href="#contact"
        className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-gold px-8 py-3.5 font-sans text-button text-on-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-navy"
      >
        {heroContent.ctaLabel}
      </a>
    </section>
  )
}
