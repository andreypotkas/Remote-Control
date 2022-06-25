import { httpServer } from './src/http_server/index.js';
import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import engine from './engine.js';

const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// Start websocket server
const wss = new WebSocketServer({
  port: 8080,
});

// Handle websocket connection
wss.on('connection', (ws: any) => {
  var stream = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });
  stream.on('data', (data: any) => {
    console.log('received: %s', data);

    engine(data, stream);
  });
});
// After starting the program displays websocket parameters
wss.on('headers', (data) => {
  console.log(data);
});

wss.on('close', () => {
  console.log('Close websocket connection...');
});
