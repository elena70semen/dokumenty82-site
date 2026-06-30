import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const host = args.get("--host") ?? "127.0.0.1";
const port = Number(args.get("--port") ?? 4310);
const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(sourceRoot, "dist");

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".ico", "image/x-icon"],
  [".xml", "application/xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
]);

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  let filePath = path.join(distRoot, clean);
  if (clean.endsWith("/")) filePath = path.join(filePath, "index.html");
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = path.join(filePath, "index.html");
  return filePath.startsWith(distRoot) ? filePath : null;
}

const server = createServer((request, response) => {
  const filePath = resolveFile(request.url ?? "/");
  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "content-type": types.get(path.extname(filePath)) ?? "application/octet-stream" });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Preview: http://${host}:${port}/`);
});
