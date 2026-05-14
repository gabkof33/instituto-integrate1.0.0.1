import type { HeroContent } from "../../shared/content.js";
import { escapeHtml, safeHref } from "../utils/escapeHtml.js";

export function renderHero(content: HeroContent) {
  const media = content.background_video
    ? `
        <video class="hero__video" autoplay muted loop playsinline aria-hidden="true">
          <source src="${escapeHtml(content.background_video)}" />
        </video>
      `
    : `<div class="hero__image" style="background-image: url('${escapeHtml(content.background_image)}');"></div>`;

  return `
    <section class="hero" id="hero">
      <div class="hero__media" aria-hidden="true">
        ${media}
        <div class="hero__pattern"></div>
        <div class="hero__orb hero__orb--one"></div>
        <div class="hero__orb hero__orb--two"></div>
        <div class="hero__orb hero__orb--three"></div>
        <div class="hero__veil"></div>
      </div>
      <div class="container">
        <div class="hero__content">
          <p class="hero__eyebrow">Instituto Integratte</p>
          <h1 class="hero__title">${escapeHtml(content.heading_primary)}</h1>
          <p class="hero__subtitle">${escapeHtml(content.heading_secondary)}</p>
          <div class="hero__actions">
            <a class="button button--primary" href="${safeHref("#contact")}">${escapeHtml(content.cta_button_primary)}</a>
            <a class="button button--secondary" href="${safeHref("#institute")}">${escapeHtml(content.cta_button_secondary)}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
