/**
 * nav.js — Injects a shared navbar into any page.
 * Usage: <div id="site-nav"></div> then include this script.
 */
(function () {
  const root = document.getElementById("site-nav");
  if (!root) return;

  let page = window.location.pathname.split('/').pop();
  if (!page || page === '/') page = 'index.html';

  const navLinks = [
    { href: 'index.html',                    label: 'Home' },
    { href: 'arduino-bangladesh.html',       label: 'Arduino' },
    { href: 'sensors-bangladesh.html',       label: 'Sensors' },
    { href: 'electronics-components-bd.html', label: 'Components' },
    { href: 'blog.html',                     label: 'Blog' },
  ];

  const linksHtml = navLinks.map(l => {
    const activeClass = page === l.href ? 'active' : '';
    return `<a href="${l.href}" class="nav-link ${activeClass}">${l.label}</a>`;
  }).join('');

  root.innerHTML = `
    <nav role="navigation" aria-label="Main navigation">
      <a href="index.html" class="nav-logo" aria-label="ElectroMartBD Home">
        ElectroMart<span>BD</span>
      </a>
      <div class="nav-center">
        ${linksHtml}
      </div>
      <div class="nav-actions">
        <a href="tel:+8801577098376" class="contact-badge" aria-label="Call us at 01577098376">
          📞 01577098376
        </a>
        <button class="mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false">
          ☰
        </button>
      </div>
    </nav>
  `;

  const menuBtn = root.querySelector('.mobile-menu-btn');
  const navCenter = root.querySelector('.nav-center');
  if (menuBtn && navCenter) {
    menuBtn.addEventListener('click', () => {
      navCenter.classList.toggle('show');
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
    });
  }
})();
