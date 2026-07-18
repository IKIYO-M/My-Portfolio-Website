// nav.js — shared mobile navigation toggle, included on every page.
// Satisfies "responsive navigation menu" requirement: on small screens
// the links collapse behind a button and expand on tap.

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.nav-toggle');
  const links = document.getElementById('primaryNav');

  if (!toggleBtn || !links) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu automatically once a link is clicked.
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
});