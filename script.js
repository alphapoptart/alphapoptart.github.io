const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Close menu' : 'Open menu';
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    const screenReaderLabel = menuToggle?.querySelector('.sr-only');
    if (screenReaderLabel) screenReaderLabel.textContent = 'Open menu';
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Northstar tech check-in from ${form.get('name')}`);
  const body = encodeURIComponent(`Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\nWhat I need help with:\n${form.get('need')}`);
  window.location.href = `mailto:hello@northstar-tech.example?subject=${subject}&body=${body}`;
  document.querySelector('#form-note').textContent = 'Your email app should open with a draft addressed to Northstar.';
});
