import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function findProjectRoot(startDir: string) {
  let currentDir = startDir;

  while (true) {
    const hasPackageJson = existsSync(path.join(currentDir, "package.json"));
    const hasContentFile = existsSync(path.join(currentDir, "data", "content.json"));

    if (hasPackageJson && hasContentFile) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      throw new Error(`Nao foi possivel localizar a raiz do projeto a partir de ${startDir}.`);
    }

    currentDir = parentDir;
  }
}

const runtimeDir = path.dirname(fileURLToPath(import.meta.url));

export const projectRoot = findProjectRoot(runtimeDir);
export const dataDir = path.join(projectRoot, "data");
export const distDir = path.join(projectRoot, "dist");
export const clientDir = path.join(distDir, "client");
export const clientIndexPath = path.join(clientDir, "index.html");
export const contentFilePath = path.join(dataDir, "content.json");
export const contactSubmissionsFilePath = path.join(dataDir, "contact-submissions.json");
