import { build } from "esbuild";
import { existsSync } from "node:fs";
import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

function findProjectRoot(startDir) {
  let currentDir = startDir;

  while (true) {
    const hasPackageJson = existsSync(path.join(currentDir, "package.json"));
    const hasClientEntry = existsSync(path.join(currentDir, "src", "client", "main.ts"));

    if (hasPackageJson && hasClientEntry) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      throw new Error(`Nao foi possivel localizar a raiz do projeto a partir de ${startDir}.`);
    }

    currentDir = parentDir;
  }
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = findProjectRoot(scriptDir);
const distDir = path.join(root, "dist");

async function copyStaticAssets() {
  await mkdir(path.join(distDir, "client", "styles"), { recursive: true });
  await cp(path.join(root, "src", "client", "index.html"), path.join(distDir, "client", "index.html"));
  await cp(path.join(root, "src", "client", "styles"), path.join(distDir, "client", "styles"), {
    recursive: true
  });
  await cp(path.join(root, "src", "client", "static"), path.join(distDir, "client", "static"), {
    recursive: true
  });
}

await rm(distDir, { recursive: true, force: true });

await build({
  entryPoints: [path.join(root, "src", "client", "main.ts")],
  bundle: true,
  format: "esm",
  outfile: path.join(distDir, "client", "assets", "app.js"),
  platform: "browser",
  sourcemap: true,
  target: ["es2020"]
});

await build({
  entryPoints: [path.join(root, "src", "server", "server.ts")],
  bundle: true,
  format: "esm",
  outfile: path.join(distDir, "server", "server.js"),
  platform: "node",
  sourcemap: true,
  target: ["node18"],
  packages: "external"
});

await copyStaticAssets();

console.log("Build finalizado em ./dist");
