import type { TeamMember } from "../../shared/content.js";
import { escapeHtml } from "../utils/escapeHtml.js";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function renderMedia(member: TeamMember) {
  if (!member.image) {
    return `
      <div class="team-card__media">
        <div class="team-card__image-placeholder">
          <span class="team-card__image-initials">${escapeHtml(getInitials(member.name))}</span>
        </div>
      </div>
    `;
  }

  const objectFit = member.image_fit === "contain" ? "contain" : "cover";
  const objectPosition = member.image_position ? member.image_position : "center";
  const mediaClass = objectFit === "contain" ? " team-card__media--contain" : "";

  return `
    <div class="team-card__media${mediaClass}">
      <img
        class="team-card__image"
        src="${escapeHtml(member.image)}"
        alt="${escapeHtml(member.name)}"
        loading="lazy"
        style="object-fit: ${objectFit}; object-position: ${escapeHtml(objectPosition)};"
      />
    </div>
  `;
}

export function renderTeamMember(member: TeamMember) {
  return `
    <article class="team-card" data-animate>
      ${renderMedia(member)}
      <div class="team-card__body">
        <p class="team-card__role">${escapeHtml(member.role)}</p>
        <h3 class="team-card__name">${escapeHtml(member.name)}</h3>
        <ul class="team-card__list">
          ${member.qualifications
            .map(
              (qualification) => `
                <li class="team-card__item">${escapeHtml(qualification)}</li>
              `
            )
            .join("")}
        </ul>
      </div>
    </article>
  `;
}
