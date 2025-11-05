const http = require('http');
const fs = require('fs');
const path = require('path');

const logMiddleware = (req) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
};

const serveStaticFile = (res, filePath) => {
  const extname = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
  };

  const contentType = mimeTypes[extname] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Файл не найден');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  logMiddleware(req);

  if (req.url === '/client.html' && req.method === 'GET') {
    serveStaticFile(res, path.join(__dirname, 'client.html'));
  } else if (req.url === '/api/data' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Данные с расширенного сервера' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Страница не найдена');
  }
});

server.listen(3001, () => {
  console.log('Расширенный сервер запущен на порту 3001');
});