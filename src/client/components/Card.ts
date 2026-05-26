import type { BenefitItem, FeatureCard, HighlightPoint, ValueCard } from "../../shared/content.js";
import { escapeHtml, safeHref } from "../utils/escapeHtml.js";

export function renderFeatureCard(card: FeatureCard) {
  return `
    <article class="card" data-animate>
      <span class="icon-badge">${escapeHtml(card.card_icon)}</span>
      <h3 class="card__title">${escapeHtml(card.card_title)}</h3>
      <p class="card__text">${escapeHtml(card.card_description)}</p>
    </article>
  `;
}

export function renderBenefitCard(item: BenefitItem) {
  return `
    <article class="card card--benefit" data-animate>
      <div class="card__header card__header--benefit">
        <span class="icon-badge icon-badge--soft">${escapeHtml(item.benefit_icon)}</span>
        <h3 class="card__title">${escapeHtml(item.benefit_title)}</h3>
      </div>
      <p class="card__text">${escapeHtml(item.benefit_text)}</p>
    </article>
  `;
}

export function renderHighlightCard(point: HighlightPoint) {
  return `
    <article class="card card--highlight" data-animate>
      <div class="card__content">
        <h3 class="card__title">${escapeHtml(point.point_title)}</h3>
        <p class="card__text">${escapeHtml(point.point_description)}</p>
      </div>
      <a class="button button--ghost" href="${safeHref("#contact")}">${escapeHtml(point.cta_button)}</a>
    </article>
  `;
}

export function renderValueCard(card: ValueCard, badge: string) {
  return `
    <article class="card" data-animate>
      <span class="icon-badge">${escapeHtml(badge)}</span>
      <h3 class="card__title">${escapeHtml(card.value_title)}</h3>
      <p class="card__text">${escapeHtml(card.value_description)}</p>
    </article>
  `;
}
