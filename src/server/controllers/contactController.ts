import type { Request, Response } from "express";
import { createContactSubmission } from "../services/contactService.js";

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(request: Request, response: Response) {
  const payload = {
    name: getString(request.body?.name),
    email: getString(request.body?.email),
    phone: getString(request.body?.phone),
    message: getString(request.body?.message)
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    response.status(400).json({ message: "Todos os campos sao obrigatorios." });
    return;
  }

  try {
    const submission = await createContactSubmission(payload);
    response.status(201).json({ success: true, submission });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Nao foi possivel salvar o contato." });
  }
}
