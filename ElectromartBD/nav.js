/**
 * nav.js — Injects a shared navbar into any page.
 * Usage: <div id="site-nav"></div>  then include this script.
 */
(function () {
  const root = document.getElementById("site-nav");
  if (!root) return;

  root.innerHTML = `
    <nav role="navigation" aria-label="Main navigation">
      <a href="index.html" class="nav-logo" aria-label="ElectroMartBD Home">
        ElectroMart<span>BD</span>
      </a>
      <a href="tel:+8801998421007" class="contact-badge" aria-label="Call us at 01998421007">
        📞 01998421007
      </a>
    </nav>
  `;
})();
