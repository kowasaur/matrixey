import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { NavBar } from "../components/navbar";

export default () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<number>();
    const [inputFocused, setInputFocused] = useState(false);
    const textarea = useRef<HTMLTextAreaElement>(null);

    function isNumber(numberish: string) {
        return !isNaN(numberish as unknown as number);
    }

    function evaluateLatex(latex: string) {
        let stack: number[] = [];
        let i = 0;
        console.log("LATEX: ", latex);

        while (i < latex.length) {
            const char = latex[i];

            if (isNumber(char)) {
                let buffer = "";
                do {
                    buffer += latex[i];
                } while (isNumber(latex[++i]));
                stack.push(parseInt(buffer));
            } else if (char === "+") {
                if (++i < latex.length) {
                    let buffer = "";
                    do {
                        buffer += latex[i];
                    } while (isNumber(latex[++i]));

                    const b = parseInt(buffer);
                    const a = stack.pop();
                    if (a === undefined) throw new Error("plus without is missing operand");
                    console.log("PLUS", a, b);
                    stack.push(a + b);
                }
            } else {
                i++;
            }
        }

        return stack.pop();
    }

    function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
        const text = e.target.value;

        if (text[text.length - 1] == "\n") {
            console.log("poggers");
        }

        setInput(text);
        setResult(evaluateLatex(text));
    }

    function focusInput() {
        textarea.current?.focus();
        setInputFocused(true);
    }

    useEffect(focusInput, []);

    return (
        <>
            <NavBar />

            <div
                className="input-box"
                // tabIndex makes focus work on divs
                tabIndex={0}
                onFocus={focusInput}
            >
                <textarea
                    id="calculator-input"
                    onChange={handleInput}
                    value={input}
                    ref={textarea}
                    onBlur={() => setInputFocused(false)}
                />
                <Latex>{`$ ${input} $`}</Latex>
                {inputFocused && <div className="cursor" />}
                {result && (
                    <div className="result">
                        <Latex>{`$ ${result} $`}</Latex>
                    </div>
                )}
            </div>
        </>
    );
};
