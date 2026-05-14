import { escapeHtml } from "../utils/escapeHtml.js";

export function renderSectionHeader(title: string, subtitle: string, align: "left" | "center" = "left") {
  const alignmentClass = align === "center" ? " section-header--center" : "";

  return `
    <header class="section-header${alignmentClass}">
      <h2 class="section-header__title">${escapeHtml(title)}</h2>
      <p class="section-header__subtitle">${escapeHtml(subtitle)}</p>
    </header>
  `;
}
