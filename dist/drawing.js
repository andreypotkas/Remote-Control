import pkg from 'robotjs';
const { moveMouse, mouseToggle, moveMouseSmooth, dragMouse, getMousePos, screen, } = pkg;
import Jimp from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export class Drawing {
    constructor() { }
    drawCircle(radius) {
        const mousePos = getMousePos();
        for (let i = 0; i <= Math.PI * 2; i += 0.01) {
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
    async prntScreen() {
        const { x, y } = getMousePos();
        let img = screen.capture(x - 100, y - 100, 200, 200);
        let data = [];
        let bitmap = img.image;
        let i = 0, l = bitmap.length;
        for (i = 0; i < l; i += 4) {
            data.push(bitmap[i + 2], bitmap[i + 1], bitmap[i], bitmap[i + 3]);
        }
        const jimp = new Jimp({
            data: new Uint8Array(data),
            width: 200,
            height: 200,
        });
        const buff = await jimp.getBase64Async(Jimp.MIME_PNG);
        const base64 = buff.split(',')[1];
        return base64;
    }
}
//# sourceMappingURL=drawing.js.map