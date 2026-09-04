import type { Metadata } from 'next';
import Link from 'next/link';
import UiIcon from '../UiIcon';
import SiteHeader from '../SiteHeader';

const contactCardHref = '/northstar-sean-widner.vcf';

export const metadata: Metadata = {
  title: 'Sean Widner | Northstar Digital Business Card',
  description: 'Save Sean Widner and Northstar Tech Concierge to your contacts for calm, plain-English technology help.',
  openGraph: {
    title: 'Sean Widner | Northstar Tech Concierge',
    description: 'A digital business card for calm, plain-English technology help.',
    url: '/card/',
    type: 'profile',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'Northstar Tech Concierge compass mark' }],
  },
  twitter: {
    card: 'summary',
    title: 'Sean Widner | Northstar Tech Concierge',
    description: 'Save Sean’s digital business card.',
    images: ['/icon-512.png'],
  },
};

export default function DigitalCardPage() {
  return (
    <main className="digital-card-page">
      <SiteHeader currentPage="card" />
      <section className="digital-card-hero" id="main-content">
        <div className="digital-card-intro">
          <p className="eyebrow"><span /> One tap from “I know a tech person”</p>
          <h1>Your Northstar contact.<em>Ready when tech gets tangled.</em></h1>
          <p>Save Sean’s card to your iPhone for patient, plain-English help with everyday technology.</p>
          <div className="digital-card-actions">
            <a className="button button-dark" href={contactCardHref}>Save to iPhone <UiIcon name="down" /></a>
            <a className="text-link" href="sms:+13528750467?body=Hi%20Sean%2C%20I%27d%20like%20some%20tech%20help.">Text Sean <UiIcon name="up-right" /></a>
          </div>
          <p className="digital-card-note">Business phone and website only. No private address or personal account details.</p>
        </div>

        <div className="digital-card-visual">
          <article className="contact-card" aria-label="Digital business card for Sean Widner at Northstar Tech Concierge">
            <div className="contact-card-orbit orbit-a" aria-hidden="true" />
            <div className="contact-card-orbit orbit-b" aria-hidden="true" />
            <div className="contact-card-heading">
              <span className="brand-mark contact-card-mark" aria-hidden="true"><i /></span>
              <div><strong>Northstar</strong><small>Tech Concierge</small></div>
            </div>
            <div className="contact-card-dial" aria-hidden="true">
              <span className="contact-card-ring" />
              <span className="contact-card-ring contact-card-ring-inner" />
              <i />
              <b>N</b>
            </div>
            <div className="contact-card-copy">
              <span>352° / YOUR TECH GUIDE</span>
              <h2>Sean<br />Widner</h2>
              <p>Tech Concierge</p>
              <dl>
                <div><dt>Call or text</dt><dd><a href="tel:+13528750467">(352) 875-0467</a></dd></div>
                <div><dt>Online</dt><dd><Link href="/">alphapoptart.github.io</Link></dd></div>
              </dl>
            </div>
            <div className="contact-card-footer">
              <span>Technology, made human.</span>
              <nav aria-label="Business card actions"><a href={contactCardHref}>Save</a><a href="sms:?body=Northstar%20Tech%20Concierge%3A%20https%3A%2F%2Falphapoptart.github.io%2Fcard%2F">Share</a><a href="tel:+13528750467">Call</a></nav>
            </div>
          </article>
        </div>
      </section>

      <section className="card-setup section-shell" id="setup">
        <div className="section-intro">
          <p className="section-index">02 / USE WITH NAMEDROP</p>
          <div>
            <h2>Save it once.<br />Share it phone to phone.</h2>
            <p>NameDrop uses the contact card on your iPhone and lets you choose exactly which fields to share.</p>
          </div>
        </div>

        <ol className="card-steps">
          <li><span>01</span><div><h3>Save the Northstar card.</h3><p>Tap “Save to iPhone,” preview the card, then add it to Contacts.</p></div></li>
          <li><span>02</span><div><h3>Use it as your card.</h3><p>Make sure Northstar’s phone and website are on the contact shown as My Card. You can keep other fields private.</p></div></li>
          <li><span>03</span><div><h3>Bring the phones together.</h3><p>Hold your screen near the top of the other iPhone, choose Share, and select the business fields you want to send.</p></div></li>
        </ol>

        <div className="namedrop-note">
          <span aria-hidden="true">N</span>
          <p><strong>Good to know:</strong> NameDrop sends new contact information; it does not update a contact the other person already has.</p>
        </div>
      </section>

      <section className="card-fallback">
        <p className="section-index">03 / NO TAP? NO PROBLEM.</p>
        <h2>Share the card link instead.</h2>
        <p>Anyone can open the page and save the same contact card—even without NameDrop.</p>
        <a className="card-share-url" href="https://alphapoptart.github.io/card/">alphapoptart.github.io/card</a>
        <a className="button button-dark" href="sms:?body=Northstar%20Tech%20Concierge%3A%20https%3A%2F%2Falphapoptart.github.io%2Fcard%2F">Share card by text <UiIcon name="up-right" /></a>
      </section>

      <footer>
        <Link className="brand footer-brand" href="/" aria-label="Northstar Tech Concierge, home">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span><strong>Northstar</strong><small>Tech Concierge</small></span>
        </Link>
        <p>Patient guidance. Plain English. No judgment.</p>
        <div><Link href="/#services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/card">Card</Link><a href="tel:+13528750467">Call</a></div>
        <small>© 2026 Northstar Tech Concierge</small>
      </footer>
    </main>
  );
}
