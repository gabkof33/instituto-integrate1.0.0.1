import type { FooterContent } from "../../shared/content.js";
import { escapeHtml, safeHref } from "../utils/escapeHtml.js";

const brandLogoSrc = "/static/team/logo_integratte.png";

function renderFooterIcon(icon = "") {
  const icons: Record<string, string> = {
    instagram: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    `,
    whatsapp: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d="M12 20a8 8 0 1 0-4.1-1.1L5 20l1.2-2.7A8 8 0 0 0 12 20z" />
        <path d="M9.3 9.1c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.6 1.4c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3 0 .6.4.8 1 1.5 1.8 2 .3.2.5.2.7 0l.5-.4c.2-.2.4-.2.7-.1l1.4.6c.4.2.4.3.4.5v.5c0 .2 0 .4-.4.6-.4.2-1 .3-1.6.1-1-.3-2-.9-3-1.8-.9-.9-1.7-1.9-2-3-.2-.6-.1-1.2.1-1.6z" />
      </svg>
    `,
    email: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 6l10 7 10-7" />
      </svg>
    `
  };

  return `
    <span class="site-footer__icon" aria-hidden="true">
      ${icons[icon] ?? ""}
    </span>
  `;
}

export function renderFooter(content: FooterContent) {
  return `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__brand" data-animate>
          <div class="site-footer__brand-lockup">
            <img class="site-footer__brand-logo" src="${brandLogoSrc}" alt="" aria-hidden="true" />
            <div class="site-footer__brand-copy">
              <span class="site-footer__logo">${escapeHtml(content.logo)}</span>
              <p class="site-footer__subtitle">${escapeHtml(content.contact_info)}</p>
            </div>
          </div>
        </div>
        <nav class="site-footer__column" aria-label="Navegação do rodapé" data-animate>
          <p class="site-footer__heading">Navegação</p>
          <div class="site-footer__nav">
            ${content.navigation_links
              .map(
                (link) => `
                  <a class="site-footer__link" href="${safeHref(link.href)}">${escapeHtml(link.label)}</a>
                `
              )
              .join("")}
          </div>
        </nav>
        <div class="site-footer__column" data-animate>
          <p class="site-footer__heading">Contato</p>
          <div class="site-footer__social">
            ${content.social_links
              .map(
                (link) => `
                  <a class="site-footer__contact-link" href="${safeHref(link.href)}" target="_blank" rel="noreferrer" title="${escapeHtml(link.label)}">
                    ${renderFooterIcon(link.icon)}
                    <span class="site-footer__contact-copy">
                      <span class="site-footer__contact-name">${escapeHtml(link.name || link.label)}</span>
                      <span class="site-footer__contact-value">${escapeHtml(link.label)}</span>
                    </span>
                  </a>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <small>${escapeHtml(content.copyright_text)}</small>
      </div>
    </footer>
  `;
}
