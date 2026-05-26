import { loadEnvironment } from "../src/server/config/loadEnv.js";
import { isContactPayloadValid, normalizeContactPayload, submitContactPayload } from "../src/server/services/contactWorkflow.js";

loadEnvironment();

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Corpo da requisicao invalido." }, { status: 400 });
  }

  const payload = normalizeContactPayload(body);

  if (!isContactPayloadValid(payload)) {
    return Response.json({ success: false, message: "Todos os campos sao obrigatorios." }, { status: 400 });
  }

  try {
    const result = await submitContactPayload(payload);

    return Response.json(
      {
        success: true,
        ...result
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          "Recebemos sua mensagem, mas nao foi possivel notificar a equipe por e-mail agora. Tente novamente em instantes."
      },
      { status: 502 }
    );
  }
}
