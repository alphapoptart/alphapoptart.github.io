import Link from 'next/link';

type PricingGridProps = {
  contactHref?: string;
};

export default function PricingGrid({ contactHref = '#contact' }: PricingGridProps) {
  return (
    <div className="price-grid">
      <article className="price-card featured-price">
        <div className="price-top"><span>REMOTE</span><i>15 MIN</i></div>
        <h3>Quick Fix</h3>
        <p>A focused remote session for one clear issue.</p>
        <strong><sup>$</sup>20</strong>
        <a href="sms:+13528750467?body=Hi%20Sean%2C%20I%27d%20like%20help%20with%20a%20Quick%20Fix.">Book by text <span aria-hidden="true">↗</span></a>
      </article>
      <article className="price-card">
        <div className="price-top"><span>REMOTE</span><i>60 MIN</i></div>
        <h3>Remote Tune-Up</h3>
        <p>Troubleshooting, setup, or a guided cleanup.</p>
        <strong><sup>$</sup>65</strong>
        <Link href={contactHref}>Get started <span aria-hidden="true">↗</span></Link>
      </article>
      <article className="price-card">
        <div className="price-top"><span>IN PERSON</span><i>60 MIN</i></div>
        <h3>In-person Tune-Up</h3>
        <p>Hands-on support for your home technology.</p>
        <strong><sup>$</sup>85</strong>
        <Link href={contactHref}>Check availability <span aria-hidden="true">↗</span></Link>
      </article>
      <article className="price-card compact-price">
        <div className="price-top"><span>GUIDANCE</span><i>60 MIN</i></div>
        <h3>Digital Confidence</h3>
        <p>Patient one-on-one learning.</p>
        <strong><sup>$</sup>55</strong>
      </article>
      <article className="price-card compact-price">
        <div className="price-top"><span>HOME</span><i>90 MIN</i></div>
        <h3>Home Technology Reset</h3>
        <p>A deeper review and reset.</p>
        <strong><sup>$</sup>125</strong>
      </article>
      <article className="price-card compact-price">
        <div className="price-top"><span>FOLLOW-UP</span><i>30 MIN</i></div>
        <h3>Office Hours</h3>
        <p>Keep momentum after a session.</p>
        <strong><sup>$</sup>35</strong>
      </article>
    </div>
  );
}
