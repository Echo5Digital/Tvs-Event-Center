import './globals.css'

export const metadata = {
  title: {
    default: 'TV Event Center - Celebrate Life\'s Best Moments',
    template: '%s | TV Event Center'
  },
  description: 'TV Event Center is a luxurious event venue perfect for weddings, corporate events, birthdays, and celebrations. Located in a picturesque setting with state-of-the-art facilities.',
  keywords: ['event venue', 'wedding hall', 'corporate events', 'birthday parties', 'luxury venue', 'event center'],
  authors: [{ name: 'TV Event Center' }],
  creator: 'TV Event Center',
  publisher: 'TV Event Center',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tveventcenter.com',
    title: 'TV Event Center - Celebrate Life\'s Best Moments',
    description: 'TV Event Center is a luxurious event venue perfect for weddings, corporate events, birthdays, and celebrations.',
    siteName: 'TV Event Center',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TV Event Center - Celebrate Life\'s Best Moments',
    description: 'TV Event Center is a luxurious event venue perfect for weddings, corporate events, birthdays, and celebrations.',
    creator: '@tveventcenter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}