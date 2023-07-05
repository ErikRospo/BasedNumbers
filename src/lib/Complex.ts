export class Complex {
    private real: number;
    private imaginary: number;

    constructor(real: number = 0, imaginary: number = 0) {
        this.real = real;
        this.imaginary = imaginary;
    }

    static fromReal(real: number): Complex {
        return new Complex(real, 0);
    }

    static fromImaginary(imaginary: number): Complex {
        return new Complex(0, imaginary);
    }

    getReal(): number {
        return this.real;
    }

    getImaginary(): number {
        return this.imaginary;
    }
    invert() {
        this.real *= -1;
        this.imaginary *= -1;
    }
    get conj(): Complex {
        return new Complex(this.real, -this.imaginary)
    }
    add(other: Complex | number): Complex {
        if (typeof other === 'number') {
            return new Complex(this.real + other, this.imaginary);
        }
        return new Complex(this.real + other.real, this.imaginary + other.imaginary);
    }

    static add(a: Complex, b: Complex | number): Complex {
        return a.add(b);
    }

    subtract(other: Complex | number): Complex {
        if (typeof other === 'number') {
            return new Complex(this.real - other, this.imaginary);
        }
        return new Complex(this.real - other.real, this.imaginary - other.imaginary);
    }

    static subtract(a: Complex, b: Complex | number): Complex {
        return a.subtract(b);
    }

    multiply(other: Complex | number): Complex {
        if (typeof other === 'number') {
            return new Complex(this.real * other, this.imaginary * other);
        }
        const real = this.real * other.real - this.imaginary * other.imaginary;
        const imaginary = this.real * other.imaginary + this.imaginary * other.real;
        return new Complex(real, imaginary);
    }

    static multiply(a: Complex, b: Complex | number): Complex {
        return a.multiply(b);
    }

    divide(other: Complex | number): Complex {
        if (typeof other === 'number') {
            return new Complex(this.real / other, this.imaginary / other);
        }
        const denominator = other.real ** 2 + other.imaginary ** 2;
        const real = (this.real * other.real + this.imaginary * other.imaginary) / denominator;
        const imaginary = (this.imaginary * other.real - this.real * other.imaginary) / denominator;
        return new Complex(real, imaginary);
    }

    static divide(a: Complex, b: Complex | number): Complex {
        return a.divide(b);
    }

    power(exponent: number): Complex {
        if (exponent === 0) {
            return new Complex(1, 0);
        }
        let result = new Complex(this.real, this.imaginary);
        for (let i = 1; i < exponent; i++) {
            result = result.multiply(this);
        }
        return result;
    }

    static power(base: Complex, exponent: number): Complex {
        return base.power(exponent);
    }

    absolute(): number {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

    static absolute(number: Complex | number): number {
        if (typeof number === 'number') {
            return Math.abs(number);
        }
        return number.absolute();
    }
    toString(precision = 2) {
        if (this.imaginary == 0) {
            return `${this.real > 0 ? "" : "-"}${Math.abs(this.real).toFixed(precision)}`
        }
        else {
            return `${this.real > 0 ? "" : "-"}${Math.abs(this.real).toFixed(precision)}${this.imaginary > 0 ? "+" : "-"}${Math.abs(this.imaginary).toFixed(precision)}i`
        }
    }
    static fromString(str: string): Complex {
        console.log(str)

        const matches = str.match(/(-?\d+(\.\d+)?)([-+])(\d+(\.\d+)?)i?/);
        console.log(matches)
        if (!matches) {
            let n = Number.parseFloat(str);
            if (!isNaN(n)) {
                return Complex.fromReal(n);
            }
            throw new Error('Invalid input string');
        }

        const real = parseFloat(matches[1]);
        const imaginary = parseFloat(matches[4]);

        return new Complex(real, matches[3] === '-' ? -imaginary : imaginary);
    }
}
