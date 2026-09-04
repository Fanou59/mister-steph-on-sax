import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
