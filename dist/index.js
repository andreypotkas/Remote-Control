import { httpServer } from './src/http_server/index.js';
import { createWebSocketStream, WebSocketServer } from 'ws';
import engine from './engine.js';
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
const wss = new WebSocketServer({
    port: 8080,
});
wss.on('connection', (ws) => {
    var stream = createWebSocketStream(ws, {
        encoding: 'utf8',
        decodeStrings: false,
    });
    stream.on('data', (data) => {
        console.log('received: %s', data);
        engine(data, stream);
    });
});
wss.on('headers', (data) => {
    console.log(data);
});
wss.on('close', () => {
    console.log('Close websocket connection...');
});
//# sourceMappingURL=index.js.map