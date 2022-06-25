import { getMousePos, moveMouse } from 'robotjs';
import { Drawing } from './drawing';
const drawing = new Drawing();
export default async function commandExecution(data, a, b, radius, ws) {
    let { x, y } = getMousePos();
    switch (data.toString()) {
        case `draw_circle ${radius}`:
            drawing.drawCircle(Number(radius));
            ws.send(`draw_circle ${radius} \0`);
            break;
        case `draw_rectangle ${a} ${b}`:
            drawing.drawRectangle(a, b);
            ws.send(`draw_rectangle ${a} ${b} \0`);
            break;
        case `draw_square ${a}`:
            drawing.drawSquare(a);
            ws.send(`draw_square ${a} \0`);
            break;
        case `mouse_right ${a}`:
            moveMouse(getMousePos().x + Number(a), y + 1);
            ws.send(`mouse_right ${a} \0`);
            break;
        case `mouse_left ${a}`:
            moveMouse(x - Number(a), y + 1);
            ws.send(`mouse_left ${a} \0`);
            break;
        case `mouse_up ${a}`:
            moveMouse(x + 1, y - Number(a));
            ws.send(`mouse_up ${a} \0`);
            break;
        case `mouse_down ${a}`:
            moveMouse(x + 1, y + Number(a));
            ws.send(`mouse_down ${a} \0`);
            break;
        case `mouse_position`:
            ws.send(`mouse_position ${x}px,${y}px \0`);
            break;
        case `prnt_scrn`:
            const print = await drawing.prntScreen();
            var base64Str = print.toString();
            ws.send(`prnt_scrn ${base64Str} \0`);
            break;
        default:
            '';
    }
}
//# sourceMappingURL=parseCommands.js.map