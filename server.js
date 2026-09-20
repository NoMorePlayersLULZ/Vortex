const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html; charset=utf-8';

    if (extname === '.css') {
        contentType = 'text/css; charset=utf-8';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Файл не найден');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('Кто-то подключился к нашему чату!');

    socket.on('chat message', (msg) => {
        console.log('Сообщение: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Кто-то отключился.');
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Сервер запущен! Порт: 3000');
});