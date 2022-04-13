import { useEffect, useRef } from "react";
import { NavBar } from "../components/navbar";

function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function approxEqual(a: number, b: number) {
    return Math.abs(a - b) <= 0.4;
}

export default () => {
    const canvas_ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvas_ref.current!;
        const context = canvas.getContext("2d")!;

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
            const y = py / 25 - 10;
            for (let px = 0; px < 500; px++) {
                const x = px / 25 - 10;
                if (approxEqual(x ** 2 + y ** 2, 16)) {
                    const offset = (py * 500 + px) * 4;
                    pixels[offset] = 255;
                    pixels[offset + 1] = 0;
                    pixels[offset + 2] = 0;
                    pixels[offset + 3] = 255;
                }
            }
        }
        context.putImageData(image_data, 0, 0);
    }, []);

    return (
        <>
            <NavBar />
            <canvas width="500" height="500" ref={canvas_ref} />
        </>
    );
};
