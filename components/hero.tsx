import Image from 'next/image'
import { heroContent } from '@/lib/content'

// AD-1 — Server Component, static, no client JS shipped for this section.
// Full-bleed action-shot Hero (supersedes the earlier cutout-portrait
// version — both superseded the original badge-only Direction B). Photo
// fills the section as a background; a scrim gradient (top-down on
// mobile, left-right on desktop, both fading into {colors.navy}) keeps
// the title legible without needing a cutout or color-matched backdrop.
export function Hero() {
  return (
    <section className="relative min-h-[640px] overflow-hidden bg-navy text-on-navy md:h-[620px] md:min-h-0">
      {/* Mobile gets its own pre-cropped asset (bottom trimmed) — at this
          aspect ratio, `fill`+cover leaves zero vertical slack to pan with
          object-position (the container's aspect is narrower/taller than
          the photo's, so height dictates the scale and the full source
          height is always shown); only a shorter source crop can push the
          subject's head down away from the text scrim. */}
      <Image
        src="/hero-stephane-stage-mobile.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_50%] md:hidden"
      />
      <Image
        src="/hero-stephane-stage.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-[78%_48%] md:block"
      />

      {/* Scrim — mobile: fades from navy (top) down into the photo. Kept
          tall enough that the text block below never gets close to the
          photo/face, regardless of font-rendering or Dynamic Type
          differences across devices. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(180deg, #1C2541 0%, #1C2541 46%, rgba(28,37,65,0) 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] md:hidden"
        style={{
          background:
            'linear-gradient(0deg, #1C2541 0%, rgba(28,37,65,0) 100%)',
        }}
      />
      {/* Scrim — desktop: fades from navy (left) across into the photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(90deg, #1C2541 0%, rgba(28,37,65,0.99) 30%, rgba(28,37,65,0.9) 42%, rgba(28,37,65,0.6) 52%, rgba(28,37,65,0.28) 62%, rgba(28,37,65,0.08) 72%, rgba(28,37,65,0) 84%)',
        }}
      />

      <div className="relative z-10 flex flex-col px-gutter-mobile pb-10 pt-9 md:h-full md:max-w-[760px] md:justify-center md:px-gutter-desktop md:py-0">
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

      <p className="absolute bottom-2 right-3 z-10 font-sans text-[0.65rem] text-on-navy/55">
        {heroContent.photoCredit}
      </p>
    </section>
  )
}
