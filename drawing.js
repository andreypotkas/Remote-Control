import pkg from 'robotjs';
const {
  moveMouse,
  mouseToggle,
  moveMouseSmooth,
  dragMouse,
  getMousePos,
  screen,
} = pkg;
import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export class Drawing {
  constructor() {}

  drawCircle(radius) {
    const mousePos = getMousePos();

    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
      // Convert polar coordinates to cartesian
      const x = mousePos.x + radius * Math.cos(i);
      const y = mousePos.y + radius * Math.sin(i);

      dragMouse(x, y);
      mouseToggle('down');
    }
    mouseToggle('up');
  }

  drawRectangle(a, b) {
    let x = getMousePos().x;
    let y = getMousePos().y;
    mouseToggle('down');
    moveMouseSmooth(x + Number(a), y);
    moveMouseSmooth(x + Number(a), y + Number(b));
    moveMouseSmooth(x, y + Number(b));
    moveMouseSmooth(x, y);
    mouseToggle('up');
  }

  drawSquare(a) {
    let x = getMousePos().x;
    let y = getMousePos().y;
    mouseToggle('down');
    moveMouseSmooth(x + Number(a), y);
    moveMouseSmooth(x + Number(a), y + Number(a));
    moveMouseSmooth(x, y + Number(a));
    moveMouseSmooth(x, y);
    mouseToggle('up');
  }

  prntScreen() {
    const { x, y } = getMousePos();
    let img = screen.capture(x - 100, y - 100, 200, 200);

    let data = [];
    let bitmap = img.image;
    let i = 0,
      l = bitmap.length;
    for (i = 0; i < l; i += 4) {
      data.push(bitmap[i + 2], bitmap[i + 1], bitmap[i], bitmap[i + 3]);
    }
    new Jimp(
      {
        data: new Uint8Array(data),
        width: 200,
        height: 200,
      },
      function (err, image) {
        if (err) {
          fs.writeFile(dirname + '/data/screen.png', '', function () {});
        } else {
          image.write(dirname + '/data/screen.png');
        }
      }
    );
  }
}
