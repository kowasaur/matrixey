export class Complex {
    constructor(readonly real: number, readonly imaginary: number) {}

    abs(): number {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

    Arg(): number {
        if (this.real === 0) return (Math.sign(this.imaginary) * Math.PI) / 2;

        const theta = Math.atan(this.imaginary / this.real);
        if (this.real > 0) return theta;
        if (this.imaginary >= 0) return Math.PI + theta;
        return theta - Math.PI;
    }

    add(other: Complex): Complex {
        return new Complex(this.real + other.real, this.imaginary + other.imaginary);
    }

    addr(operand: number) {
        return new Complex(this.real + operand, this.imaginary);
    }

    addi(operand: number) {
        return new Complex(this.real, this.imaginary + operand);
    }

    sub(other: Complex): Complex {
        return new Complex(this.real - other.real, this.imaginary - other.imaginary);
    }

    subr(operand: number) {
        return new Complex(this.real - operand, this.imaginary);
    }

    subi(operand: number) {
        return new Complex(this.real, this.imaginary - operand);
    }
}
