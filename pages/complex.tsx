import { useEffect, useRef, useState } from "react";
import { NavBar } from "../components/navbar";
import { Complex } from "../maths";

function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// @ts-expect-error it is used but by the user
function approxEqual(a: number, b: number, precision = 0.05): boolean {
    return Math.abs(a - b) <= precision;
}

const ARC_CODE = `z => {
    const c  = z.subr(1).subi(2)
    const a = c.Arg()
    return 0 <= a && a <= 2 * Math.PI / 3 && approxEqual(c.abs(), 2)
}`;

export default () => {
    const canvas_ref = useRef<HTMLCanvasElement>(null);
    const [expression, setExpression] = useState("z => approxEqual(z.abs(), 4)");

    const Example: React.FC<{ code: string }> = ({ code, children }) => (
        <button onClick={() => setExpression(code)}>{children}</button>
    );

    useEffect(() => {
        let inSet: (z: Complex) => boolean;
        try {
            inSet = eval(expression);
            inSet(new Complex(3, 4)); // ensuring it works
        } catch {
            return;
        }

        const canvas = canvas_ref.current!;
        const context = canvas.getContext("2d")!;

        context.clearRect(0, 0, 500, 500); // reset canvas

        // Minor grid lines
        context.strokeStyle = "lightgrey";
        for (let x = 25; x < 250; x += 25) {
            drawLine(context, x, 0, x, 500);
            context.fillText(`-${10 - x / 25}`, x - 6, 265);
        }
        for (let x = 275; x < 500; x += 25) {
            drawLine(context, x, 0, x, 500);
            context.fillText(`${x / 25 - 10}`, x - 4, 265);
        }
        for (let y = 25; y < 250; y += 25) {
            drawLine(context, 0, y, 500, y);
            context.fillText(`${10 - y / 25}`, 239, y + 4);
        }
        for (let y = 275; y < 500; y += 25) {
            drawLine(context, 0, y, 500, y);
            context.fillText(`${10 - y / 25}`, 235, y + 4);
        }

        // Axis lines
        context.lineWidth = 2;
        context.strokeStyle = "black";
        drawLine(context, 0, 250, 500, 250); // Horizontal Axis Line
        drawLine(context, 250, 0, 250, 500); // Verticle Axis Line

        const image_data = context.getImageData(0, 0, 500, 500);
        const pixels = image_data.data;
        for (let py = 0; py < 500; py++) {
            const y = 10 - py / 25;
            for (let px = 0; px < 500; px++) {
                const x = px / 25 - 10;
                if (inSet(new Complex(x, y))) {
                    const offset = (py * 500 + px) * 4;
                    pixels[offset] = 255;
                    pixels[offset + 1] = 0;
                    pixels[offset + 2] = 0;
                    pixels[offset + 3] = 255;
                }
            }
        }
        context.putImageData(image_data, 0, 0);
    }, [expression]);

    return (
        <>
            <NavBar />
            <canvas width="500" height="500" ref={canvas_ref} />
            <textarea
                cols={40}
                rows={27}
                onChange={e => setExpression(e.target.value)}
                value={expression}
            />
            <br />
            <div>
                <h2>Examples</h2>
                <Example code="z => approxEqual(z.abs(), 4)">Circle</Example>
                <Example code={ARC_CODE}>Arc</Example>
                <Example code="z => approxEqual(z.addr(2).abs(), Math.sqrt(5) + z.subi(1).abs(), 0.0001)">
                    Ray
                </Example>
                <Example code="z => Math.PI / 6 <= z.Arg() && z.Arg() <= 5 * Math.PI / 6 && z.subi(1).abs() <= 2">
                    Fan
                </Example>
            </div>
        </>
    );
};
