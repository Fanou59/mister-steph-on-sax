import { listenSection, listenTeaser } from '@/lib/content'

const WAVE_BAR_HEIGHTS_PX = [22, 40, 16, 52, 28, 44, 18, 36, 24]

// AD-1 — Server Component, static. No audio player yet (Deferred in
// ARCHITECTURE-SPINE.md) — purely decorative waveform, aria-hidden.
export function ListenTeaser() {
  return (
    <section
      id="ecoute"
      className="grid items-center gap-10 bg-sage px-gutter-mobile py-section-y text-on-sage md:grid-cols-[1fr_auto] md:px-gutter-desktop"
    >
      <div>
        <p className="mb-3 font-sans text-eyebrow uppercase text-ink">
          {listenSection.eyebrow}
        </p>
        <h2 className="mb-3 font-display text-h2">{listenTeaser.title}</h2>
        <p className="max-w-[42ch] font-sans text-body opacity-90">
          {listenTeaser.body}
        </p>
      </div>

      <div aria-hidden="true" className="flex h-16 items-end gap-1">
        {WAVE_BAR_HEIGHTS_PX.map((height, index) => (
          <span
            key={index}
            className="w-[5px] rounded-full bg-navy opacity-55"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </section>
  )
}
