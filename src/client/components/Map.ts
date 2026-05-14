import type { LocationContent } from "../../shared/content.js";
import { escapeHtml, safeHref } from "../utils/escapeHtml.js";

export function renderMap(content: LocationContent) {
  const latitude = content.latitude || -18.9141;
  const longitude = content.longitude || -48.2777;
  const phoneHref = `tel:${content.phone.replace(/\D/g, "")}`;
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(content.address)}/@${latitude},${longitude},15z`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(content.address)}&z=15&output=embed`;

  return `
    <section class="section section--location" id="location">
      <div class="container section__inner section__inner--map">
        <div class="location-content">
          <div class="location-info" data-animate>
            <h2 class="location-title">Visite-nos</h2>
            <address class="location-address">
              <a href="${safeHref(mapsUrl)}" target="_blank" rel="noreferrer" class="location-address__link" title="Abrir no Google Maps">
                <span class="location-address__text">${escapeHtml(content.address)}</span>
              </a>
              <a href="${safeHref(phoneHref)}" class="location-phone" title="Ligar para Instituto Integratte">
                <svg class="location-icon" viewBox="0 0 24 24" fill="none" focusable="false">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${escapeHtml(content.phone)}
              </a>
            </address>

            <div class="location-hours">
              <h3 class="location-hours__title">Horário de Funcionamento</h3>
              <div class="hours-list">
                ${content.hours
                  .map(
                    (hour) => `
                      <div class="hours-item">
                        <span class="hours-day">${escapeHtml(hour.day)}</span>
                        <span class="hours-status ${hour.closed ? 'is-closed' : 'is-open'}">
                          ${escapeHtml(hour.closed ? "Fechado" : hour.times)}
                        </span>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <div
            class="location-map"
            data-animate
          >
            <iframe
              class="map-container"
              src="${escapeHtml(embedUrl)}"
              title="Mapa do Instituto Integratte"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
            <a class="map-open-link" href="${safeHref(mapsUrl)}" target="_blank" rel="noreferrer">
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
