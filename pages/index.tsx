import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default () => {
    const [input, setInput] = useState("");
    const [inputFocused, setInputFocused] = useState(false);
    const textarea = useRef<HTMLTextAreaElement>(null);

    function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
        setInput(e.target.value);
    }

    function focusInput() {
        textarea.current?.focus();
        setInputFocused(true);
    }

    useEffect(focusInput, []);

    return (
        // tabIndex makes focus work on divs
        <div className="input-box" tabIndex={0} onFocus={focusInput}>
            <textarea
                onChange={handleInput}
                value={input}
                ref={textarea}
                onBlur={() => setInputFocused(false)}
            />
            <Latex>{`$ ${input}$`}</Latex>
            {inputFocused && <div className="cursor" />}
        </div>
    );
};
