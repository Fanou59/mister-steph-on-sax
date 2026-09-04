import { ContactForm } from '@/components/contact-form/contact-form'
import { Formules } from '@/components/formules'
import { Hero } from '@/components/hero'
import { ListenTeaser } from '@/components/listen-teaser'

// EXPERIENCE.md § Information Architecture — one page, fixed section order.
// Footer is site-chrome, not one of these 4 governed sections — it lives in
// app/layout.tsx so it also appears on /mentions-legales and
// /politique-de-confidentialite, not just here.
export default function Home() {
  return (
    <main>
      <Hero />
      <ListenTeaser />
      <Formules />
      <ContactForm />
    </main>
  )
}
