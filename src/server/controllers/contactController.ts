import type { Request, Response } from "express";
import { isContactPayloadValid, normalizeContactPayload, submitContactPayload } from "../services/contactWorkflow.js";

export async function submitContact(request: Request, response: Response) {
  const payload = normalizeContactPayload(request.body);

  if (!isContactPayloadValid(payload)) {
    response.status(400).json({ message: "Todos os campos sao obrigatorios." });
    return;
  }

  try {
    const result = await submitContactPayload(payload);

    response.status(201).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error(error);
    response.status(502).json({
      success: false,
      message:
        "Recebemos sua mensagem, mas nao foi possivel notificar a equipe por e-mail agora. Tente novamente em instantes."
    });
  }
}
