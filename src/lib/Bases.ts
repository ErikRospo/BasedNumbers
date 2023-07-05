import { Complex } from "./Complex";
import { nonan } from "./util";
export const baseCHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
function calculateSign(last: boolean, valSign: "+" | "-"): "+" | "-" | "" {
    if (last) {
        return ""
    }
    else {
        return valSign
    }
}
export class Bases {
    public base: Complex
    public placeValues: number[] = [];
    public placeOffset: number = 0;
    public sign: "+" | "-" = "+"
    constructor(base: number | Complex) {
        if (typeof base == 'number') {
            this.base = new Complex(base, 0);
        } else {
            this.base = base;
        }
    }
    public setPVFromNum(num: number) {
        this.placeValues = []
        let ts = num.toString();
        if (ts.split(".").length == 2) {
            this.placeOffset = -ts.split(".")[1].length;
        } else {
            this.placeOffset = 0
        }
        for (let i = 0; i < ts.length; i++) {
            const element = ts[i];
            if (element == ".") {
                continue;
            } else if (element == "-") {
                this.sign = "-"
                continue
            }
            else if (element == "+") {
                this.sign = "+"
                continue;
            }
            this.placeValues.push(nonan(Number.parseInt(element)))
        }
        return this
    }
    get value() {
        let accumulator: Complex = new Complex()
        let last_val: Complex = this.base.power(this.placeOffset);
        let l = this.placeValues.length - 1;
        for (let i = 0; i < this.placeValues.length; i++) {
            const element = last_val.multiply(this.placeValues[l - i]);
            accumulator = accumulator.add(element);
            last_val = last_val.multiply(this.base);
        }
        if (this.sign == "-") {
            accumulator.invert()
        }
        return accumulator;
    }
    get expandedString(): string {
        let accumulator = "";
        let last_val: Complex = this.base.power(this.placeOffset);
        let l = this.placeValues.length - 1;
        for (let i = 0; i < this.placeValues.length; i++) {
            const element = this.placeValues[l - i]

            accumulator += `${element}*${last_val.toString()}${calculateSign(l - i == 0, this.sign)}`
            last_val = last_val.multiply(this.base);
        }

        return accumulator;
    }
    get string() {
        let accumulator = "";
        let last_val: Complex = this.base.power(this.placeOffset);
        let l = this.placeValues.length - 1;
        for (let i = 0; i < this.placeValues.length; i++) {
            const element = this.placeValues[l - i]
            if (element > 1)
                accumulator += `${element}*${last_val.toString()}${calculateSign(l - i == 0, this.sign)}`
            if (element == 1)
                accumulator += `${last_val.toString()}${calculateSign(l - i == 0, this.sign)}`
            last_val = last_val.multiply(this.base);
        }
        return accumulator;
    }
}
