import type { Request, Response } from "express";
import { getSiteContent } from "../services/contentService.js";

export async function getContent(_request: Request, response: Response) {
  try {
    const content = await getSiteContent();
    response.json(content);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Nao foi possivel carregar o conteudo." });
  }
}
