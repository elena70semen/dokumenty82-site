(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('.uh');
  const nav = document.getElementById('header-nav');
  const toggle = document.getElementById('menu-toggle');

  root.classList.add('js');

  if (nav && !nav.querySelector('.uh-cabinet-link')) {
    const cabinetLink = document.createElement('a');
    cabinetLink.className = 'uh-navlink uh-cabinet-link';
    cabinetLink.href = '/cabinet/';
    cabinetLink.textContent = 'Личный кабинет';
    nav.append(cabinetLink);
  }

  const setMenu = (open, restoreFocus = false) => {
    if (!nav || !toggle) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    if (restoreFocus && toggle.getClientRects().length) toggle.focus({ preventScroll: true });
  };

  toggle?.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (nav?.classList.contains('open')) {
      setMenu(false, true);
      event.preventDefault();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (nav?.classList.contains('open') && !event.target.closest('.uh')) setMenu(false);
  });

  const desktop = window.matchMedia('(min-width: 1200px)');
  const closeOnDesktop = (event) => {
    if (event.matches) setMenu(false);
  };
  desktop.addEventListener?.('change', closeOnDesktop);

  document.querySelectorAll('#main .icon-tile img, #main .hero-art').forEach((image) => {
    const holder = image.closest('.icon-tile') || image.closest('.hero-figure');
    if (!holder) return;
    image.addEventListener('error', () => holder.classList.add('media-failed'));
    image.addEventListener('load', () => holder.classList.remove('media-failed'));
    if (image.loading !== 'lazy' && image.complete && !image.naturalWidth) holder.classList.add('media-failed');
  });
})();
