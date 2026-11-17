const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, 'public');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};
const port = Number(process.env.PORT || 8082);
http.createServer(async (request,response) => {
  if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
  let requested;
  try { requested = decodeURIComponent(new URL(request.url,'http://localhost').pathname); }
  catch { response.writeHead(400); response.end(); return; }
  const filename = requested.endsWith('/') ? `${requested}index.html` : requested;
  const target = path.resolve(root, `.${filename}`);
  if (!target.startsWith(root + path.sep)) { response.writeHead(404); response.end(); return; }
  try {
    const stat = await fs.stat(target);
    if (!stat.isFile()) throw new Error('not a file');
    const body = await fs.readFile(target);
    response.writeHead(200, {'Content-Type':mime[path.extname(target).toLowerCase()] || 'application/octet-stream','Content-Length':body.length});
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    const body = await fs.readFile(path.join(root,'404.html'));
    response.writeHead(404, {'Content-Type':'text/html; charset=utf-8','Content-Length':body.length});
    response.end(request.method === 'HEAD' ? undefined : body);
  }
}).listen(port,process.env.HOST || '127.0.0.1',()=>console.log(`Serving public at http://${process.env.HOST || '127.0.0.1'}:${port}`));
