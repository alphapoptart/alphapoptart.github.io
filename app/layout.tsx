import type { Metadata, Viewport } from 'next';
import { DM_Mono, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] });
const dmMono = DM_Mono({ variable: '--font-dm-mono', subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://alphapoptart.github.io'),
  title: 'Northstar Tech Concierge | Technology, made human',
  description: 'Calm, patient, plain-English technology help for households, independent professionals, and small teams.',
  applicationName: 'Northstar Tech Concierge',
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Northstar',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Northstar Tech Concierge',
    description: 'Technology, made human. Calm, plain-English help for everyday technology.',
    type: 'website',
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Northstar Tech Concierge — Technology, made human.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northstar Tech Concierge',
    description: 'Technology, made human. Calm, plain-English help for everyday technology.',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#102b35',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${dmMono.variable}`}>{children}</body></html>;
}
