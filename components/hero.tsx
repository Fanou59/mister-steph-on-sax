import Image from 'next/image'
import { heroContent } from '@/lib/content'

// AD-1 — Server Component, static, no client JS shipped for this section.
// Cutout Hero — background removed from Stephane's own photo (busy indoor
// scene with bystanders) and the figure duotoned into the brand navy so it
// reads as part of the same palette rather than a flat-gray sticker. One
// asset serves both breakpoints (no object-position cropping needed since
// it's sized by height, not `fill`+cover); only the desktop gets a left-to-
// right scrim, since on mobile the photo sits below the text with no
// overlap needing legibility protection.
export function Hero() {
  return (
    <section className="relative min-h-[640px] overflow-hidden bg-navy text-on-navy md:flex md:h-[620px] md:min-h-0 md:items-end">
      {/* Mobile: photo anchored bottom-right, close to the section edge —
          there's no "gap to the right edge" problem here since the photo
          sits below the text, not beside it. */}
      <div className="absolute bottom-0 right-[-10px] z-[1] md:hidden">
        <Image
          src="/hero-stephane-cutout.webp"
          alt=""
          aria-hidden="true"
          width={1138}
          height={1750}
          priority
          className="h-[400px] w-auto"
        />
      </div>

      {/* Scrim — desktop only: fades from navy (left) across into the photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            'linear-gradient(90deg, #1C2541 0%, rgba(28,37,65,0.99) 30%, rgba(28,37,65,0.9) 42%, rgba(28,37,65,0.6) 52%, rgba(28,37,65,0.28) 62%, rgba(28,37,65,0.08) 72%, rgba(28,37,65,0) 84%)',
        }}
      />

      <div className="relative z-10 flex flex-col px-gutter-mobile pb-10 pt-9 md:h-full md:w-[540px] md:shrink-0 md:justify-center md:px-gutter-desktop md:py-0">
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
          className="mt-8 inline-flex min-h-11 items-center self-start rounded-sm bg-gold px-8 py-3.5 font-sans text-button text-on-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-navy"
        >
          {heroContent.ctaLabel}
        </a>
      </div>

      {/* Desktop: photo centered in the remaining space between the text
          column and the section's right edge, rather than pinned to the
          edge. */}
      <div className="relative z-[1] hidden md:flex md:h-full md:flex-1 md:items-end md:justify-center">
        <Image
          src="/hero-stephane-cutout.webp"
          alt=""
          aria-hidden="true"
          width={1138}
          height={1750}
          priority
          className="h-[680px] w-auto"
        />
      </div>
    </section>
  )
}
