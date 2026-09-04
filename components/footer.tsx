import Link from 'next/link'
import { footerContent } from '@/lib/content'

// AD-1 — Server Component, static, no client JS. Site chrome, not one of the
// 4 fixed sections EXPERIENCE.md governs — rendered from app/layout.tsx so
// it appears on every route (home + the two legal pages), not just app/page.tsx.
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy px-gutter-mobile py-8 text-on-navy md:px-gutter-desktop">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
        <nav aria-label="Liens légaux" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footerContent.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-body-sm text-on-navy-soft underline underline-offset-2 hover:text-on-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="font-sans text-body-sm text-on-navy-soft">
          © {year} {footerContent.brand} — {footerContent.rightsReserved}
        </p>
      </div>
    </footer>
  )
}
