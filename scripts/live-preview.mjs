import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function findProjectRoot(startDir) {
  let currentDir = startDir;

  while (true) {
    const hasPackageJson = existsSync(path.join(currentDir, "package.json"));
    const hasServerEntry = existsSync(path.join(currentDir, "src", "server", "server.ts"));

    if (hasPackageJson && hasServerEntry) {
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
const port = process.env.PORT ?? "3000";

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options
    });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} saiu com codigo ${code}`));
    });
  });
}

let serverProcess;

async function startPreview() {
  await run("node", ["./scripts/build.mjs"], { cwd: root });

  serverProcess = spawn("node", ["./dist/server/server.js"], {
    cwd: root,
    env: {
      ...process.env,
      PORT: port
    },
    stdio: "inherit",
    shell: process.platform === "win32"
  });

  const stopServer = () => {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill("SIGINT");
    }
  };

  process.on("SIGINT", stopServer);
  process.on("SIGTERM", stopServer);

  serverProcess.once("exit", (code) => {
    process.exit(code ?? 0);
  });

  console.log(`Preview disponivel em http://localhost:${port}`);
}

startPreview().catch((error) => {
  console.error("Falha ao iniciar preview:", error);
  process.exit(1);
});
