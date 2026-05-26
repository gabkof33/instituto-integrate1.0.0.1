import nodemailer from "nodemailer";
import type { ContactSubmission } from "../../shared/content.js";

const defaultNotificationEmail = "administrativo@integratte.com.br";

function readEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function parseBoolean(value: string) {
  return /^(1|true|yes|on)$/i.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTransportConfig() {
  const host = readEnv("SMTP_HOST");
  const portValue = readEnv("SMTP_PORT") || "587";
  const user = readEnv("SMTP_USER");
  const pass = readEnv("SMTP_PASS");

  if (!host || !user || !pass) {
    throw new Error("Configuracao SMTP ausente. Defina SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS.");
  }

  const port = Number(portValue);

  if (!Number.isFinite(port)) {
    throw new Error("SMTP_PORT invalido. Use um numero valido.");
  }

  return {
    host,
    port,
    secure: parseBoolean(readEnv("SMTP_SECURE")) || port === 465,
    auth: {
      user,
      pass
    }
  };
}

function getFromAddress() {
  const customFrom = readEnv("SMTP_FROM");

  if (customFrom) {
    return customFrom;
  }

  const user = readEnv("SMTP_USER");
  return user ? `Instituto Integratte <${user}>` : defaultNotificationEmail;
}

function getNotificationEmail() {
  return readEnv("CONTACT_NOTIFICATION_EMAIL") || defaultNotificationEmail;
}

function formatSubmissionDate(createdAt: string) {
  const date = new Date(createdAt);

  return Number.isNaN(date.getTime())
    ? createdAt
    : new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
      }).format(date);
}

export async function sendContactNotification(submission: ContactSubmission) {
  const transporter = nodemailer.createTransport(getTransportConfig());

  const formattedDate = formatSubmissionDate(submission.createdAt);
  const safeName = escapeHtml(submission.name);
  const safeEmail = escapeHtml(submission.email);
  const safePhone = escapeHtml(submission.phone);
  const safeMessage = escapeHtml(submission.message).replace(/\n/g, "<br />");

  await transporter.sendMail({
    from: getFromAddress(),
    to: getNotificationEmail(),
    replyTo: submission.email,
    subject: `Novo contato pelo site - ${submission.name}`,
    text: [
      "Novo contato recebido pelo site Integratte.",
      "",
      `Nome: ${submission.name}`,
      `E-mail: ${submission.email}`,
      `WhatsApp: ${submission.phone}`,
      `Enviado em: ${formattedDate}`,
      "",
      "Mensagem:",
      submission.message
    ].join("\n"),
    html: `
      <div style="font-family: Segoe UI, Arial, sans-serif; color: #0b3031; line-height: 1.6;">
        <h2 style="margin: 0 0 16px; color: #0f7f7e;">Novo contato recebido pelo site Integratte</h2>
        <p style="margin: 0 0 8px;"><strong>Nome:</strong> ${safeName}</p>
        <p style="margin: 0 0 8px;"><strong>E-mail:</strong> ${safeEmail}</p>
        <p style="margin: 0 0 8px;"><strong>WhatsApp:</strong> ${safePhone}</p>
        <p style="margin: 0 0 16px;"><strong>Enviado em:</strong> ${escapeHtml(formattedDate)}</p>
        <div style="padding: 16px; border-radius: 12px; background: rgba(15, 127, 126, 0.08);">
          <strong>Mensagem:</strong>
          <p style="margin: 12px 0 0;">${safeMessage}</p>
        </div>
      </div>
    `
  });
}
