import type { ActionLink, FooterContent, ProgramItem, SiteContent } from "../../shared/content.js";
import { renderBenefitCard, renderFeatureCard, renderHighlightCard, renderValueCard } from "../components/Card.js";
import { renderFooter } from "../components/Footer.js";
import { renderContactForm } from "../components/Form.js";
import { renderHero } from "../components/Hero.js";
import { renderMap } from "../components/Map.js";
import { renderSectionHeader } from "../components/SectionHeader.js";
import { renderTeamMember } from "../components/Team.js";
import { renderTimeline } from "../components/Timeline.js";
import { escapeHtml, safeHref } from "../utils/escapeHtml.js";

const brandLogoSrc = "/static/team/logo_integratte.png";

function renderBrandMark() {
  return `
    <span class="site-header__brand-mark" aria-hidden="true">
      <img class="site-header__brand-logo" src="${brandLogoSrc}" alt="" />
    </span>
  `;
}

function renderHeaderIcon(icon = "generic") {
  const icons: Record<string, string> = {
    home: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d="M4 11.5L12 5l8 6.5" />
        <path d="M7 10.5V19h10v-8.5" />
      </svg>
    `,
    spark: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d="M12 4l1.8 5.2L19 11l-5.2 1.8L12 18l-1.8-5.2L5 11l5.2-1.8L12 4z" />
      </svg>
    `,
    pulse: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d="M3 12h4l2.2-4 3.6 8 2.2-4H21" />
      </svg>
    `,
    clinic: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d="M6 19V7l6-3 6 3v12" />
        <path d="M9 10h6M12 7v6M10 19v-4h4v4" />
      </svg>
    `,
    team: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM16.5 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M4.5 18a4.5 4.5 0 0 1 7 0M13 17.5a4 4 0 0 1 6.5-1" />
      </svg>
    `,
    contact: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d="M6 4h12v16l-3-2H6z" />
        <path d="M9 9h6M9 13h4" />
      </svg>
    `,
    generic: `
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <circle cx="12" cy="12" r="4" />
      </svg>
    `
  };

  return `
    <span class="site-header__link-icon" aria-hidden="true">
      ${icons[icon] ?? icons.generic}
    </span>
  `;
}

function renderHeaderLink(link: ActionLink) {
  return `
    <a class="site-header__link" href="${safeHref(link.href)}" data-header-link>
      ${renderHeaderIcon(link.icon)}
      <span class="site-header__link-label">${escapeHtml(link.label)}</span>
    </a>
  `;
}

function renderSiteHeader(content: FooterContent) {
  return `
    <header class="site-header" data-header>
      <div class="container site-header__inner">
        <a class="site-header__brand" href="#hero" aria-label="${escapeHtml(content.logo)}">
          ${renderBrandMark()}
          <span class="site-header__brand-copy">
            <span class="site-header__brand-title">${escapeHtml(content.logo)}</span>
            <span class="site-header__brand-subtitle">${escapeHtml(content.brand_subtitle)}</span>
          </span>
        </a>
        <div class="site-header__controls">
          <button
            class="site-header__menu-button"
            type="button"
            aria-expanded="false"
            aria-controls="site-navigation"
            aria-label="Abrir menu"
            data-header-toggle
          >
            <span class="site-header__menu-bar"></span>
            <span class="site-header__menu-bar"></span>
            <span class="site-header__menu-bar"></span>
          </button>
        </div>
        <div class="site-header__panel" data-header-panel aria-hidden="true">
          <nav class="site-header__nav" id="site-navigation" aria-label="Navegação principal">
            ${content.navigation_links.map((link) => renderHeaderLink(link)).join("")}
          </nav>
        </div>
      </div>
    </header>
  `;
}

function renderInstituteMedia(imageProfile: string) {
  if (imageProfile) {
    return `<img class="media-frame__image" src="${escapeHtml(imageProfile)}" alt="Imagem aqui" />`;
  }

  return `
    <div class="media-frame__placeholder">
      <img class="media-frame__brand-image" src="${brandLogoSrc}" alt="" aria-hidden="true" />
      <span class="media-frame__eyebrow">Instituto Integratte</span>
      <strong class="media-frame__title">Medicina Funcional de Precisão</strong>
    </div>
  `;
}

function renderProgramMedia(program: ProgramItem) {
  if (program.image) {
    return `
      <img
        class="program-card__image"
        src="${escapeHtml(program.image)}"
        alt="${escapeHtml(program.title)}"
        loading="lazy"
      />
    `;
  }

  return "";
}

function renderProgramCard(program: ProgramItem) {
  const media = renderProgramMedia(program);
  const hasMedia = Boolean(media);

  return `
    <article class="program-card${hasMedia ? "" : " program-card--text-only"}">
      <div class="program-card__copy">
        <p class="program-card__eyebrow">Programa Integratte</p>
        <h3 class="program-card__title">${escapeHtml(program.title)}</h3>
        <p class="program-card__tagline">${escapeHtml(program.tagline)}</p>
        <p class="program-card__summary">${escapeHtml(program.summary)}</p>
      </div>
      ${hasMedia ? `<div class="program-card__media">${media}</div>` : ""}
    </article>
  `;
}

function renderProgramCarousel(programs: ProgramItem[]) {
  return `
    <div class="program-carousel" data-program-carousel data-animate>
      <div class="program-carousel__topbar">
        <p class="program-carousel__counter" data-program-counter>01 / ${String(programs.length).padStart(2, "0")}</p>
      </div>
      <div class="program-carousel__stage">
        <button
          class="program-carousel__button program-carousel__button--prev"
          type="button"
          data-program-prev
          aria-label="Programa anterior"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <div class="program-carousel__viewport" data-program-viewport tabindex="0" aria-label="Carrossel de programas">
          ${programs
            .map(
              (program, index) => `
                <div class="program-carousel__slide" data-program-slide data-program-index="${index}">
                  ${renderProgramCard(program)}
                </div>
              `
            )
            .join("")}
        </div>
        <button
          class="program-carousel__button program-carousel__button--next"
          type="button"
          data-program-next
          aria-label="Próximo programa"
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      <div class="program-carousel__dots" aria-label="Selecionar programa">
        ${programs
          .map(
            (program, index) => `
              <button
                class="program-carousel__dot ${index === 0 ? "is-active" : ""}"
                type="button"
                data-program-dot="${index}"
                aria-label="Ir para ${escapeHtml(program.title)}"
                aria-pressed="${index === 0 ? "true" : "false"}"
              ></button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

export function renderApp(content: SiteContent) {
  return `
    <div class="site-shell">
      ${renderSiteHeader(content.footer)}
      <main class="site-main">
        ${renderHero(content.hero)}

        <section class="section section--institute" id="institute">
          <div class="container section__inner section__inner--split">
            <div class="section-copy">
              ${renderSectionHeader(content.institute.section_title, content.institute.text_block)}
              ${renderTimeline(content.institute.timeline)}
            </div>
            <div class="media-frame" data-animate>
              ${renderInstituteMedia(content.institute.image_profile)}
            </div>
          </div>
        </section>

        <section class="section section--team" id="team">
          <div class="container section__inner">
            ${renderSectionHeader(content.team.section_title, content.team.section_subtitle, "center")}
            <div class="team-grid">
              ${content.team.members.map((member) => renderTeamMember(member)).join("")}
            </div>
          </div>
        </section>

        <section class="section section--about" id="about">
          <div class="container section__inner">
            ${renderSectionHeader(content.about.section_title, content.about.section_description)}
            <div class="card-grid card-grid--features">
              ${content.about.feature_cards.map((card) => renderFeatureCard(card)).join("")}
            </div>
          </div>
        </section>

        <section class="section section--benefits" id="benefits">
          <div class="container section__inner">
            ${renderSectionHeader(content.benefits.section_title, content.benefits.section_subtitle, "center")}
            <div class="card-grid card-grid--benefits">
              ${content.benefits.benefits_grid.map((item) => renderBenefitCard(item)).join("")}
            </div>
          </div>
        </section>

        <section class="section section--transformation" id="transformation">
          <div class="container section__inner section__inner--split">
            <div class="section-copy">
              ${renderSectionHeader(content.transformation.section_title, content.transformation.section_text_block)}
            </div>
            <div class="card-grid card-grid--highlights">
              ${content.transformation.highlight_points.map((point) => renderHighlightCard(point)).join("")}
            </div>
          </div>
        </section>

        <section class="section section--programs" id="programs">
          <div class="container section__inner">
            ${renderSectionHeader(content.programs.section_title, content.programs.section_subtitle, "center")}
            ${renderProgramCarousel(content.programs.items)}
          </div>
        </section>

        <section class="section section--mvv" id="mvv">
          <div class="container section__inner">
            <div class="statement-grid">
              <article class="statement-card" data-animate>
                <span class="icon-badge">M</span>
                <span class="statement-card__label">Missão</span>
                <h2 class="statement-card__title">${escapeHtml(content.missionVisionValues.mission_block.title)}</h2>
                <p class="statement-card__text">${escapeHtml(content.missionVisionValues.mission_block.description)}</p>
              </article>
              <article class="statement-card statement-card--accent" data-animate>
                <span class="icon-badge icon-badge--soft">V</span>
                <span class="statement-card__label">Visão</span>
                <h2 class="statement-card__title">${escapeHtml(content.missionVisionValues.vision_block.title)}</h2>
                <p class="statement-card__text">${escapeHtml(content.missionVisionValues.vision_block.description)}</p>
              </article>
            </div>
            <div class="card-grid card-grid--values">
              ${content.missionVisionValues.values_cards
                .map((card, index) => renderValueCard(card, String(index + 1).padStart(2, "0")))
                .join("")}
            </div>
          </div>
        </section>

        <section class="section section--contact" id="contact">
          <div class="container section__inner section__inner--contact">
            <div class="section-copy">
              ${renderSectionHeader(content.contact.section_title, content.contact.section_subtitle)}
            </div>
            <div class="contact-panel" data-animate>
              ${renderContactForm(content.contact)}
            </div>
          </div>
        </section>

        ${renderMap(content.location)}

        <section class="section section--cta" id="cta">
          <div class="container">
            <div class="cta-banner" data-animate>
              <div class="cta-banner__copy">
                <h2 class="cta-banner__title">${escapeHtml(content.cta.cta_title)}</h2>
                <p class="cta-banner__text">${escapeHtml(content.cta.cta_subtitle)}</p>
              </div>
              <a class="button button--primary" href="#contact">${escapeHtml(content.cta.cta_button)}</a>
            </div>
          </div>
        </section>
      </main>
      ${renderFooter(content.footer)}
    </div>
  `;
}
