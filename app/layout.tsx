import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Footer } from '@/components/footer'
import './globals.css'

// Revalidate daily so the footer's `new Date().getFullYear()` (baked into
// the static HTML at build time otherwise) can't drift more than a day
// stale across a year rollover without needing a redeploy.
export const revalidate = 86400

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mister Steph On Sax — Saxophoniste événementiel',
  description:
    "Saxophoniste événementiel pour vins d'honneur, cocktails, mariages et événementiel privé ou d'entreprise. Réservez une date.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${playfairDisplay.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased">
        {children}
        <Footer />
      </body>
    </html>
  )
}
