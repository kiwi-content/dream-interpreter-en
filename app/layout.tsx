import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://dream-free-en.vercel.app'),

  title: {
    default: 'Free Dream Interpreter | What Did Your Dream Mean?',
    template: '%s | Dream',
  },

  description:
    "AI-powered dream interpretation. Get instant, personalized analysis of your dream's symbols, emotions, and hidden meaning. Free, no sign-up required.",

  keywords: [
    'dream interpreter',
    'dream meaning',
    'dream analysis',
    'what does my dream mean',
    'dream symbols',
    'snake dream meaning',
    'teeth falling out dream',
    'flying dream meaning',
    'free dream interpretation',
  ],

  openGraph: {
    title: 'Free Dream Interpreter | What Did Your Dream Mean?',
    description: 'AI-powered dream interpretation. Instant, personalized analysis. Free.',
    url: 'https://dream-free-en.vercel.app',
    siteName: 'Dream Interpreter',
    locale: 'en_US',
    type: 'website',
  },

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Dream Interpreter',
  description: "AI-powered dream interpretation. Get instant analysis of your dream's hidden meaning.",
  url: 'https://dream-free-en.vercel.app',
  applicationCategory: 'LifestyleApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <div className="floating-shape shape-1" aria-hidden="true" />
        <div className="floating-shape shape-2" aria-hidden="true" />
        <div className="floating-shape shape-3" aria-hidden="true" />

        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>

        <main id="main-content" className="relative z-10">
          {children}
        </main>

        <footer className="relative z-10 mt-20 py-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-white/60 text-sm mb-3">A place that listens to your story. Always here for you.</p>
            <p className="text-white/40 text-xs">
              These interpretations are for reference only and do not replace professional counseling.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
