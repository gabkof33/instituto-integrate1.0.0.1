import { readFile } from "node:fs/promises";
import type { SiteContent } from "../../shared/content.js";
import { contentFilePath } from "../config/paths.js";

export async function getSiteContent() {
  const raw = await readFile(contentFilePath, "utf8");
  return JSON.parse(raw) as SiteContent;
}
