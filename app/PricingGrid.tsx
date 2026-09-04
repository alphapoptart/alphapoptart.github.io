import UiIcon from './UiIcon';

type PriceOption = { category: string; duration: string; name: string; description: string; price: number; ctaLabel: string; smsBody: string; featured?: boolean; compact?: boolean };
const message = (offer: string) => `sms:+13528750467?body=${encodeURIComponent(`Hi Sean, I'd like help with ${offer}.`).replace(/'/g, '%27')}`;
const options: PriceOption[] = [
  { category: 'REMOTE', duration: '15 MIN', name: 'Quick Fix', description: 'A focused remote session for one clear issue.', price: 20, ctaLabel: 'Book by text', smsBody: message('a Quick Fix'), featured: true },
  { category: 'REMOTE', duration: '60 MIN', name: 'Remote Tune-Up', description: 'Troubleshooting, setup, or a guided cleanup.', price: 65, ctaLabel: 'Book by text', smsBody: message('a Remote Tune-Up') },
  { category: 'IN PERSON', duration: '60 MIN', name: 'In-person Tune-Up', description: 'Hands-on support for your home technology.', price: 85, ctaLabel: 'Ask about this session', smsBody: message('an In-person Tune-Up') },
  { category: 'GUIDANCE', duration: '60 MIN', name: 'Digital Confidence', description: 'Patient one-on-one learning.', price: 55, ctaLabel: 'Ask about this session', smsBody: message('Digital Confidence'), compact: true },
  { category: 'HOME', duration: '90 MIN', name: 'Home Technology Reset', description: 'A deeper review and reset.', price: 125, ctaLabel: 'Book by text', smsBody: message('a Home Technology Reset'), compact: true },
  { category: 'FOLLOW-UP', duration: '30 MIN', name: 'Office Hours', description: 'Keep momentum after a session.', price: 35, ctaLabel: 'Ask about this session', smsBody: message('Office Hours'), compact: true },
];

export default function PricingGrid(): React.ReactNode {
  return <div className="price-grid">{options.map((option) => <article className={`price-card${option.featured ? ' featured-price' : ''}${option.compact ? ' compact-price' : ''}`} key={option.name}>
    <div className="price-top"><span>{option.category}</span><i>{option.duration}</i></div><h3>{option.name}</h3><p>{option.description}</p><strong><sup>$</sup>{option.price}</strong><a href={option.smsBody}>{option.ctaLabel} <UiIcon name="up-right" /></a>
  </article>)}</div>;
}
