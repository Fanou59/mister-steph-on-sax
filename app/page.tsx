import { ContactForm } from '@/components/contact-form/contact-form'
import { Formules } from '@/components/formules'
import { Hero } from '@/components/hero'
import { ListenTeaser } from '@/components/listen-teaser'

// EXPERIENCE.md § Information Architecture — one page, fixed section order.
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
