import type { Metadata } from 'next';
import Link from 'next/link';
import PricingGrid from '../PricingGrid';

export const metadata: Metadata = {
  title: 'Pricing | Northstar Tech Concierge',
  description: 'Clear, human-sized pricing for remote help, home technology support, digital confidence, and follow-up sessions.',
  openGraph: {
    title: 'Northstar Tech Concierge Pricing',
    description: 'Clear starting points and no mystery invoices.',
    url: '/pricing',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Northstar Tech Concierge — Technology, made human.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northstar Tech Concierge Pricing',
    description: 'Clear starting points and no mystery invoices.',
    images: ['/og.png'],
  },
};

export default function PricingPage() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Northstar Tech Concierge, home">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span><strong>Northstar</strong><small>Tech Concierge</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/#services">Services</Link>
          <Link href="/#process">How it works</Link>
          <Link href="/pricing" aria-current="page">Pricing</Link>
        </nav>

        <Link className="header-cta" href="/#contact">Let’s talk <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="pricing-page-hero">
        <p className="eyebrow"><span /> Clear before we begin</p>
        <h1>Straight answers.<br /><em>Human-sized prices.</em></h1>
        <p>Choose a starting point or simply describe what’s happening. Sean will help you find the lightest-weight option that fits.</p>
        <Link className="text-link" href="/">← Back to home</Link>
      </section>

      <section className="pricing section-shell pricing-page-grid" aria-labelledby="pricing-options">
        <div className="section-intro pricing-intro">
          <p className="section-index">01 / STARTING POINTS</p>
          <div>
            <h2 id="pricing-options">No mystery invoices.</h2>
            <p>Scope and price are agreed before work begins. If the job changes, you hear about it first.</p>
          </div>
        </div>
        <PricingGrid contactHref="/#contact" />
      </section>

      <section className="pricing-promise">
        <p className="section-index">02 / THE NORTHSTAR PROMISE</p>
        <h2>You’ll know what we’re doing,<br />why it matters, and what it costs.</h2>
        <div>
          <span>Clear scope</span><i aria-hidden="true">✦</i>
          <span>Plain English</span><i aria-hidden="true">✦</i>
          <span>No surprise work</span>
        </div>
      </section>

      <section className="pricing-page-contact">
        <div>
          <p className="section-index">03 / NOT SURE WHICH FITS?</p>
          <h2>Start with the problem.<br /><em>We’ll find the right session.</em></h2>
        </div>
        <div>
          <a className="button button-dark" href="sms:+13528750467?body=Hi%20Sean%2C%20I%27m%20not%20sure%20which%20service%20fits.%20Here%27s%20what%27s%20going%20on%3A%20">Describe it by text <span aria-hidden="true">↗</span></a>
          <a className="contact-phone" href="tel:+13528750467"><small>CALL SEAN</small><strong>(352) 875-0467</strong></a>
        </div>
      </section>

      <footer>
        <Link className="brand footer-brand" href="/" aria-label="Northstar Tech Concierge, home">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span><strong>Northstar</strong><small>Tech Concierge</small></span>
        </Link>
        <p>Patient guidance. Plain English. No judgment.</p>
        <div><Link href="/#services">Services</Link><Link href="/pricing">Pricing</Link><a href="tel:+13528750467">Call</a></div>
        <small>© 2026 Northstar Tech Concierge</small>
      </footer>
    </main>
  );
}
