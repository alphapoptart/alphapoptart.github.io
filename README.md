# Villages Tech Concierge — Marketing Website

Static marketing site for Villages Tech Concierge, Sean's tech & AI concierge
business serving The Villages, FL.

- Business: Villages Tech Concierge, LLC
- Phone: (352) 875-0467 (click-to-call everywhere)
- Email: sean@villagestechconcierge.com

## Pages

- `index.html` — Home: value proposition for the 55+ audience, popular services, testimonials placeholder
- `services.html` — Full priced catalog (Tier 1 in-home, Tier 2 monthly retainers $49/$99/$129, Tier 3 free workshops)
- `about.html` — About Sean (patient, plain-English, scam-defense emphasis)
- `service-area.html` — The Villages (no travel fee) + surrounding communities (+$35)
- `contact.html` — Click-to-call phone prominent + contact form (Formspree placeholder action)

## Design notes

- 20px base font / 18px minimum text, high-contrast palette tuned to WCAG AA
- Mobile-first responsive layout with a simple JS menu toggle (`js/main.js`)
- No build step and no dependencies — plain HTML/CSS/JS; deploy by uploading the folder

## Before going live

1. Register villagestechconcierge.com and point it at this site.
2. Create a Formspree form and replace `your-form-id` in `contact.html`'s form action.
3. Replace the photo placeholder on `about.html` with a real photo of Sean.
