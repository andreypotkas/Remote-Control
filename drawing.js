import pkg from 'robotjs';
const { moveMouse, mouseToggle, moveMouseSmooth, dragMouse, getMousePos } = pkg;

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
}
