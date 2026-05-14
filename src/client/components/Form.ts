import type { ContactContent } from "../../shared/content.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function renderContactForm(content: ContactContent) {
  return `
    <form class="contact-form" data-contact-form novalidate>
      <div class="contact-form__grid">
        <label class="field">
          <span class="field__label">Nome</span>
          <input class="field__input" type="text" name="name" placeholder="${escapeHtml(content.input_name)}" required />
        </label>
        <label class="field">
          <span class="field__label">E-mail</span>
          <input class="field__input" type="email" name="email" placeholder="${escapeHtml(content.input_email)}" required />
        </label>
        <label class="field">
          <span class="field__label">WhatsApp</span>
          <input class="field__input" type="tel" name="phone" placeholder="${escapeHtml(content.input_phone)}" required />
        </label>
        <label class="field field--full">
          <span class="field__label">Mensagem</span>
          <textarea class="field__input field__input--textarea" name="message" placeholder="${escapeHtml(content.textarea_message)}" required></textarea>
        </label>
      </div>
      <div class="contact-form__actions">
        <button class="button button--primary" type="submit">${escapeHtml(content.submit_button)}</button>
      </div>
      <p class="contact-form__status" data-contact-status aria-live="polite"></p>
    </form>
  `;
}
