// Passenger startup file for Namecheap cPanel ("Setup Node.js App").
//
// Set this file as the "Application startup file" in the Node.js Selector.
// Phusion Passenger uses "reverse port binding": it hooks the first http.Server
// that calls listen() and forces it onto its own Unix socket, so the port below
// is effectively ignored on the server. Keeping process.env.PORT lets `node server.js`
// also work for a local production smoke-test.
//
// IMPORTANT: this is a CUSTOM server (not Next.js standalone output) on purpose.
// Standalone bundles a node_modules pruned for the BUILD OS — building on Windows
// would ship the Windows Prisma engine and crash on CloudLinux. With this custom
// server we run `npm install` + `prisma generate` ON the server, so the Linux
// engine is correct.

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
