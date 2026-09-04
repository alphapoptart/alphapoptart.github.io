'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import UiIcon from './UiIcon';

export type SiteHeaderPage = 'home' | 'pricing' | 'card';
type SiteHeaderProps = { currentPage: SiteHeaderPage };
const genericSms = "sms:+13528750467?body=Hi%20Sean%2C%20I%27d%20like%20some%20tech%20help.";
const pricingSms = "sms:+13528750467?body=Hi%20Sean%2C%20I%27m%20not%20sure%20which%20service%20fits.%20Here%27s%20what%27s%20going%20on%3A%20";

export default function SiteHeader({ currentPage }: SiteHeaderProps): React.ReactNode {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => { setOpen(false); menuButtonRef.current?.focus(); };
  const selectMenuLink = () => setOpen(false);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);
  const ctaHref = currentPage === 'card' ? '/northstar-sean-widner.vcf' : currentPage === 'pricing' ? pricingSms : genericSms;
  const nav = [
    ['Services', '/#services'], ['How it works', '/#process'], ['Pricing', '/pricing/'], ['Digital card', '/card/'],
  ] as const;
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Northstar Tech Concierge, home"><span className="brand-mark" aria-hidden="true"><i /></span><span><strong>Northstar</strong><small>Tech Concierge</small></span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([label, href]) => <Link key={label} href={href} aria-current={(currentPage === 'pricing' && label === 'Pricing') || (currentPage === 'card' && label === 'Digital card') ? 'page' : undefined}>{label}</Link>)}</nav>
      <a className="header-cta" href={ctaHref}><span className="header-cta-desktop">{currentPage === 'card' ? 'Save card' : 'Let’s talk'}</span><span className="header-cta-mobile">{currentPage === 'card' ? 'Save' : 'Text'}</span><UiIcon name={currentPage === 'card' ? 'down' : 'up-right'} /></a>
      <button ref={menuButtonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span>Menu</span><UiIcon name={open ? 'close' : 'menu'} /></button>
      <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" hidden={!open}>{<Link href="/" onClick={selectMenuLink}>Home</Link>}{nav.map(([label, href]) => <Link key={label} href={href} onClick={selectMenuLink}>{label}</Link>)}<div className="mobile-menu-actions"><a href={currentPage === 'card' ? genericSms : ctaHref} onClick={selectMenuLink}>Text Sean</a><a href="tel:+13528750467" onClick={selectMenuLink}>Call Sean</a></div></nav>
    </header>
  </>;
}
