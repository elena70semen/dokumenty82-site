// Local review only: API requests are mocked; analytics cannot load via CSP.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const port = Number(process.env.PORT || 8184);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.json': 'application/json', '.xml': 'application/xml' };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-src https://yandex.ru https://yandex.com");
  if (url.pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');
    if (url.pathname === '/api/lead' && req.method === 'POST') {
      req.resume();
      return res.end(JSON.stringify({ ok: true, id: 'LOCAL-PREVIEW-ONLY', crm_status: 'sent' }));
    }
    res.statusCode = 503;
    return res.end(JSON.stringify({ ok: false, error: 'Local preview: no live API connection' }));
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  let file;
  try { file = path.resolve(root, '.' + decodeURIComponent(url.pathname)); }
  catch { res.writeHead(400); return res.end(); }
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || relative.split(path.sep).some(p => p.startsWith('.')) || /^(internal|server)(?:\\|\/|$)/.test(relative)) {
    res.writeHead(404); return res.end();
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end(); }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Monochrome preview: http://127.0.0.1:${port}/ (mock API; no CRM/analytics)`));
