import type { TimelineItem } from "../../shared/content.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function renderTimeline(items: TimelineItem[]) {
  return `
    <ol class="timeline" data-animate>
      ${items
        .map(
          (item) => `
            <li class="timeline__item">
              <span class="timeline__year">${escapeHtml(item.year)}</span>
              <div class="timeline__content">
                <h3 class="timeline__title">${escapeHtml(item.title)}</h3>
                <p class="timeline__description">${escapeHtml(item.description)}</p>
              </div>
            </li>
          `
        )
        .join("")}
    </ol>
  `;
}
