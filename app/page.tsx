import CompassScene from './CompassScene';
import PricingGrid from './PricingGrid';
import UiIcon from './UiIcon';
import Link from 'next/link';
import SiteHeader from './SiteHeader';

export default function Home() {
  return (
    <main id="top">
      <SiteHeader currentPage="home" />
      <section className="hero" id="main-content">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Calm, human technology support</p>
          <h1>Technology should feel <em>simple.</em></h1>
          <p className="hero-lede">
            Patient, plain-English help for the devices, accounts, and everyday
            tech that keep getting in your way.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="sms:+13528750467?body=Hi%20Sean%2C%20I%27d%20like%20some%20tech%20help.">Tell me what’s stuck <UiIcon name="up-right" /></a>
            <a className="text-link" href="#services">See how I help <UiIcon name="down" /></a>
          </div>
          <div className="human-note">
            <span className="status-dot" aria-hidden="true" />
            <p><strong>Technology, made human.</strong> No jargon. No judgment.</p>
          </div>
        </div>

        <div className="hero-visual"><CompassScene /></div>
      </section>

      <aside className="promise-rail" aria-label="Service promises">
        <span>Designed for real life</span><i aria-hidden="true">✦</i>
        <span>Remote-friendly</span><i aria-hidden="true">✦</i>
        <span>Privacy-minded</span><i aria-hidden="true">✦</i>
        <span>Human-sized support</span>
      </aside>

      <section className="services section-shell" id="services">
        <div className="section-intro">
          <p className="section-index">02 / YOUR COORDINATES</p>
          <div>
            <h2>One calm point of contact for the tech in your life.</h2>
            <p>Bring me the thing that’s been bugging you. We’ll find the smallest useful way forward.</p>
          </div>
        </div>

        <div className="service-grid">
          <article className="service-card service-card-lime" id="service-home">
            <div className="card-meta"><span>300° / HOME</span><i>01</i></div>
            <div className="service-object object-home" aria-hidden="true"><span /><span /><span /></div>
            <h3>Home technology</h3>
            <p>Devices, Wi-Fi, backups, smart-home basics, and the little glitches that drain your day.</p>
            <ul><li>Setups & tune-ups</li><li>Home tech resets</li><li>Remote quick fixes</li></ul>
            <a href="sms:+13528750467?body=Hi%20Sean%2C%20I%27d%20like%20help%20with%20Home%20technology.">Find your fix <UiIcon name="up-right" /></a>
          </article>

          <article className="service-card service-card-paper" id="service-confidence">
            <div className="card-meta"><span>060° / CONFIDENCE</span><i>02</i></div>
            <div className="service-object object-confidence" aria-hidden="true"><span /><i /></div>
            <h3>Digital confidence</h3>
            <p>Patient, judgment-free walkthroughs that help technology finally make sense.</p>
            <ul><li>One-on-one guidance</li><li>Plain-English answers</li><li>Practice at your pace</li></ul>
            <a href="sms:+13528750467?body=Hi%20Sean%2C%20I%27d%20like%20help%20with%20Digital%20confidence.">Build confidence <UiIcon name="up-right" /></a>
          </article>

          <article className="service-card service-card-orange" id="service-business">
            <div className="card-meta"><span>140° / BUSINESS</span><i>03</i></div>
            <div className="service-object object-business" aria-hidden="true"><span /><span /><span /></div>
            <h3>Small-business systems</h3>
            <p>Simple workflows and reliable tools for independent professionals and small teams.</p>
            <ul><li>Workflow cleanup</li><li>Tool selection</li><li>Practical automation</li></ul>
            <a href="sms:+13528750467?body=Hi%20Sean%2C%20I%27d%20like%20help%20with%20Small-business%20systems.">Clear the bottleneck <UiIcon name="up-right" /></a>
          </article>
        </div>
      </section>

      <section className="process" id="process">
        <div className="process-inner">
          <div className="process-heading">
            <p className="section-index section-index-light">03 / HOW IT WORKS</p>
            <h2>Less overwhelm.<br /><em>More true north.</em></h2>
            <p>No mystery process and no open-ended meter. You’ll always know what we’re doing and why.</p>
            <div className="process-instrument" aria-hidden="true">
              <div className="instrument-ring ring-outer" />
              <div className="instrument-ring ring-inner" />
              <div className="instrument-needle"><span /><i /></div>
              <b>N</b>
            </div>
          </div>

          <ol className="process-steps">
            <li>
              <span>01</span>
              <div><p>START HERE</p><h3>Tell me the story.</h3><p>What’s happening, what have you tried, and what would “fixed” feel like?</p></div>
            </li>
            <li>
              <span>02</span>
              <div><p>CALIBRATE</p><h3>Choose the smallest useful fix.</h3><p>We agree on the scope and price before anything changes.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><p>MOVE FORWARD</p><h3>Understand what changed.</h3><p>You leave with the problem handled and the next step clear.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="privacy section-shell">
        <div className="privacy-statement">
          <p className="section-index">04 / PRIVACY, ALWAYS</p>
          <h2>Your technology is personal.<br /><em>Your control stays yours.</em></h2>
          <p>I’ll never ask for passwords, one-time codes, access to financial accounts, or permission to move money. If a task crosses a safety boundary, I’ll say so plainly.</p>
        </div>
        <div className="privacy-beacon" aria-hidden="true">
          <div><span>PRIVATE</span><i /></div>
          <strong>YOU STAY<br />IN CONTROL</strong>
          <small>NO PASSWORDS · NO SURPRISES</small>
        </div>
      </section>

      <section className="pricing section-shell" id="pricing">
        <div className="section-intro pricing-intro">
          <p className="section-index">05 / SIMPLE PRICING</p>
          <div>
            <h2>Clear starting points.<br />No mystery invoices.</h2>
            <p>We agree on scope before work begins. If the job changes, you hear about it first.</p>
          </div>
        </div>

        <PricingGrid />
        <div className="pricing-footer">
          <p className="pricing-note">Not sure which fits? Tell me what’s going on and I’ll point you to the lightest-weight option.</p>
          <Link href="/pricing">Open the full pricing page <UiIcon name="up-right" /></Link>
        </div>
      </section>

      <section className="faq section-shell" id="faq">
        <div className="faq-heading">
          <p className="section-index">06 / GOOD TO KNOW</p>
          <h2>A few plain-English answers.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Can you help remotely?<UiIcon name="plus" /></summary>
            <p>Yes. Many quick fixes, account questions, walkthroughs, and tune-ups can be handled by phone or a secure remote session.</p>
          </details>
          <details>
            <summary>Will I understand what you changed?<UiIcon name="plus" /></summary>
            <p>That’s the point. I explain decisions in plain English, show you what matters, and leave you with a clear next step.</p>
          </details>
          <details>
            <summary>What if the problem is bigger than expected?<UiIcon name="plus" /></summary>
            <p>We pause and recalibrate. You’ll get a clear recommendation and updated scope before any extra work begins.</p>
          </details>
          <details>
            <summary>What won’t you handle?<UiIcon name="plus" /></summary>
            <p>I don’t access financial accounts, move money, handle passwords or one-time codes, enter regulated systems, or provide legal, tax, medical, financial, or cybersecurity advice.</p>
          </details>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orbit" aria-hidden="true"><span /><i /></div>
        <p className="section-index">07 / LET’S GET YOU UNSTUCK</p>
        <h2>Ready to make technology<br /><em>feel lighter?</em></h2>
        <p>Tell Sean what’s happening. A short text is plenty.</p>
        <div className="contact-actions">
          <a className="button button-dark" href="sms:+13528750467?body=Hi%20Sean%2C%20I%27d%20like%20some%20tech%20help.">Send a text <UiIcon name="up-right" /></a>
          <a className="contact-phone" href="tel:+13528750467"><small>CALL SEAN</small><strong>(352) 875-0467</strong></a>
        </div>
        <Link className="contact-card-link" href="/card">Save my digital business card <UiIcon name="up-right" /></Link>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Northstar Tech Concierge, back to top">
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span><strong>Northstar</strong><small>Tech Concierge</small></span>
        </a>
        <p>Patient guidance. Plain English. No judgment.</p>
        <div><a href="#services">Services</a><Link href="/pricing">Pricing</Link><Link href="/card">Card</Link><a href="tel:+13528750467">Call</a></div>
        <small>© 2026 Northstar Tech Concierge</small>
      </footer>
    </main>
  );
}
