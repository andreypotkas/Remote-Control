import Jimp from 'jimp';
import { httpServer } from './src/http_server/index.js';
import { WebSocketServer, WebSocket } from 'ws';
import { Drawing } from './drawing.js';
import pkg from 'robotjs';
import getParams from './utils/getParams.js';

const { moveMouse, mouseToggle, moveMouseSmooth, dragMouse, getMousePos } = pkg;

const drawing = new Drawing();
const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: 8080,
});

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log('received: %s', data);
    const values = getParams(data);
    let x = getMousePos().x;
    let y = getMousePos().y;
    console.log(`${x}, ${y}`);
    console.log(data.toString());
    switch (data.toString()) {
      case `draw_circle ${values[0]}`:
        drawing.drawCircle(values[0]);
        ws.send(`draw_circle ${values[0]}`);
        break;
      case `draw_rectangle ${values[0]} ${values[1]}`:
        drawing.drawRectangle(values[0], values[1]);
        ws.send(`draw_rectangle ${values[0]} ${values[1]}`);
        break;
      case `draw_square ${values[0]}`:
        drawing.drawSquare(values[0]);
        ws.send(`draw_square ${values[0]}`);
        break;
      case `mouse_right ${values[0]}`:
        moveMouse(getMousePos().x + Number(values[0]), y + 1);
        ws.send(`mouse_right ${values[0]}`);
        break;
      case `mouse_left ${values[0]}`:
        moveMouse(x - values[0], y + 1);
        ws.send(`mouse_left ${values[0]}`);
        break;
      case `mouse_up ${values[0]}`:
        moveMouse(x + 1, y - values[0]);
        ws.send(`mouse_up ${values[0]}`);
        break;
      case `mouse_down ${values[0]}`:
        moveMouse(x + 1, y + Number(values[0]));
        ws.send(`mouse_down ${values[0]}`);
        break;
      case `mouse_position`:
        ws.send(`mouse_position: x: ${x}, y: ${y} `);
        break;
      case `mouse_position`:
        ws.send(`mouse_position: x: ${x}, y: ${y} `);
        break;
      default:
        '';
    }
  });

  ws.send('close', () => {});
});
