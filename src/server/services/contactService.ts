import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import type { ContactPayload, ContactSubmission } from "../../shared/content.js";
import { contactSubmissionsFilePath } from "../config/paths.js";

async function ensureStore() {
  await mkdir(dirname(contactSubmissionsFilePath), { recursive: true });

  try {
    await readFile(contactSubmissionsFilePath, "utf8");
  } catch {
    await writeFile(contactSubmissionsFilePath, "[]\n", "utf8");
  }
}

async function readSubmissions() {
  await ensureStore();
  const raw = await readFile(contactSubmissionsFilePath, "utf8");
  return JSON.parse(raw) as ContactSubmission[];
}

export async function createContactSubmission(payload: ContactPayload) {
  const submissions = await readSubmissions();

  const submission: ContactSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...payload
  };

  submissions.push(submission);
  await writeFile(contactSubmissionsFilePath, `${JSON.stringify(submissions, null, 2)}\n`, "utf8");

  return submission;
}
