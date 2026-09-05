import Image from 'next/image'
import { heroContent } from '@/lib/content'

// AD-1 — Server Component, static, no client JS shipped for this section.
// Photo-led Hero (supersedes the badge-only Direction B, now that a real
// photo of Stephane exists — see ARCHITECTURE-SPINE.md § Deferred). The
// photo is a pre-cut (transparent background) asset placed directly on
// the navy Hero background, so no color-matching is needed at runtime.
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-on-navy">
      <div className="relative mx-auto flex max-w-[1400px] flex-col md:h-[720px] md:flex-row md:items-stretch">
        <div className="relative order-2 mt-2 h-64 w-full sm:h-80 md:absolute md:inset-y-0 md:right-8 md:order-none md:mt-0 md:h-full md:w-[46%]">
          <Image
            src="/hero-stephane.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(min-width: 768px) 46vw, 100vw"
            className="object-contain object-bottom md:object-right-bottom"
          />
        </div>

        <div className="relative z-10 order-1 flex flex-col items-start px-gutter-mobile py-section-y md:w-[64%] md:justify-center md:px-gutter-desktop md:py-0">
          <p className="mb-3 font-sans text-eyebrow uppercase text-gold">
            {heroContent.eyebrow}
          </p>
          <h1 className="max-w-[10ch] text-balance font-display text-h1 leading-[0.98] md:text-[clamp(2.5rem,6vw,4.6rem)]">
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
        </div>
      </div>
    </section>
  )
}
