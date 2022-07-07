import pkg from 'robotjs';
import { Drawing } from './drawing.js';
import getParams from './utils/getParams.js';
const { getMousePos, moveMouse } = pkg;
const drawing = new Drawing();
export default async function engine(data, stream) {
    let { x, y } = getMousePos();
    const a = getParams(data.toString())[0];
    const b = getParams(data.toString())[1];
    const radius = getParams(data.toString())[0];
    switch (data.toString()) {
        case `draw_circle ${radius}`:
            drawing.drawCircle(Number(radius));
            stream.write(`draw_circle ${radius} \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        case `draw_rectangle ${a} ${b}`:
            drawing.drawRectangle(a, b);
            stream.write(`draw_rectangle ${a} ${b} \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        case `draw_square ${a}`:
            drawing.drawSquare(a);
            stream.write(`draw_square ${a} \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        case `mouse_right ${a}`:
            moveMouse(getMousePos().x + Number(a), y + 1);
            stream.write(`mouse_right ${a} \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        case `mouse_left ${a}`:
            moveMouse(x - Number(a), y + 1);
            stream.write(`mouse_left ${a} \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        case `mouse_up ${a}`:
            moveMouse(x + 1, y - Number(a));
            stream.write(`mouse_up ${a} \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        case `mouse_down ${a}`:
            moveMouse(x + 1, y + Number(a));
            stream.write(`mouse_down ${a} \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        case `mouse_position`:
            stream.write(`mouse_position ${x}px,${y}px \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        case `prnt_scrn`:
            const print = await drawing.prntScreen();
            var base64Str = print.toString();
            stream.write(`prnt_scrn ${base64Str} \0`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            break;
        default:
            '';
    }
}
//# sourceMappingURL=engine.js.map