import type { ContactPayload } from "../../shared/content.js";
import { createContactSubmission } from "./contactService.js";
import { sendContactNotification } from "./emailService.js";

export function normalizeContactPayload(source: unknown): ContactPayload {
  const record = source && typeof source === "object" ? (source as Record<string, unknown>) : {};

  return {
    name: typeof record.name === "string" ? record.name.trim() : "",
    email: typeof record.email === "string" ? record.email.trim() : "",
    phone: typeof record.phone === "string" ? record.phone.trim() : "",
    message: typeof record.message === "string" ? record.message.trim() : ""
  };
}

export function isContactPayloadValid(payload: ContactPayload) {
  return Boolean(payload.name && payload.email && payload.phone && payload.message);
}

export async function submitContactPayload(payload: ContactPayload) {
  const { submission, saved } = await createContactSubmission(payload);
  await sendContactNotification(submission);

  return {
    submission,
    saved,
    message: "Mensagem enviada com sucesso. Em breve entraremos em contato."
  };
}
