const path = require('path');
const http = require('http');
const fs = require('fs');

const dir = path.join('./dist');

const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript',
};

// eslint-disable-next-line consistent-return
const server = http.createServer((req, res) => {
  const reqpath = req.url.toString().split('?')[0];
  if (req.method !== 'GET') {
    res.statusCode = 501;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Method not implemented');
  }
  const file = path.join(dir, reqpath.replace(/\/$/, '/index.html'));
  if (file.indexOf(dir + path.sep) !== 0) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Forbidden');
  }
  const type = mime[path.extname(file).slice(1)] || 'text/plain';
  const s = fs.createReadStream(file);
  s.on('open', () => {
    res.setHeader('Content-Type', type);
    s.pipe(res);
  });
  s.on('error', () => {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('Not found');
  });
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000/');
});
