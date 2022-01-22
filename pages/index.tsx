import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export default () => {
    return (
        <Latex strict>{`$
        \\begin{bmatrix}
            a \\\\
            b
        \\end{bmatrix}
        $`}</Latex>
    );
};
