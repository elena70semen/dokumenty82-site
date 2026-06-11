import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requestedDir = process.argv[2] ?? "out";
const port = Number(process.argv[3] ?? 4173);
const host = "127.0.0.1";
const publicDir = path.resolve(root, requestedDir);
const workspaceRoot = path.resolve(root, "..", "..");

if (!publicDir.toLowerCase().startsWith(workspaceRoot.toLowerCase())) {
  throw new Error(`Refusing to serve outside workspace root: ${publicDir}`);
}

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

async function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const candidate = path.resolve(publicDir, cleanPath);
  if (!candidate.toLowerCase().startsWith(publicDir.toLowerCase())) {
    return null;
  }

  const stats = await stat(candidate).catch(() => null);
  if (stats?.isFile()) return candidate;
  if (stats?.isDirectory()) {
    const indexFile = path.join(candidate, "index.html");
    const indexStats = await stat(indexFile).catch(() => null);
    if (indexStats?.isFile()) return indexFile;
  }

  const withIndex = path.join(candidate, "index.html");
  const withIndexStats = await stat(withIndex).catch(() => null);
  if (withIndexStats?.isFile()) return withIndex;

  return null;
}

const server = createServer(async (request, response) => {
  const filePath = await resolveFile(request.url ?? "/");
  if (!filePath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    "content-type": types[ext] ?? "application/octet-stream",
    "cache-control": "no-store"
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Serving ${publicDir} at http://${host}:${port}/`);
});
