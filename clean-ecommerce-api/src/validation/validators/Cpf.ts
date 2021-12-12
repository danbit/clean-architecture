import { CPFValidatorError } from "../error/CPFValidatorError";

class Cpf {
    static readonly VALID_CPF_LENGHT = 11;
    static readonly FACTOR = 2;

    constructor(readonly value: string) {
        if (!this.validate(value)) {
            throw new CPFValidatorError(value)
        }
        this.value = value
    }

    private validate(cpf: string) {
        if (!cpf) {
            return false
        }
        const newCpf = this.normalizeCpf(cpf)
        if (newCpf.length != Cpf.VALID_CPF_LENGHT) {
            return false
        }
        if (this.areAllDigitsTheSame(newCpf)) {
            return false
        }
        const partialDigits = this.retrieveArrayWithFirstNineDigitsFromCPF(newCpf)
        const firstDigit = this.calculateFirstCheckDigit(partialDigits)
        const secondDigit = this.calculateSecondCheckDigit(partialDigits, firstDigit)
        return this.hasLastCpfDigitsEqualsCheckDigits(newCpf, firstDigit, secondDigit)
    }

    private normalizeCpf(cpf: string) {
        return cpf.replace(/\D/g, '')
    }

    private areAllDigitsTheSame(cpf: string) {
        return cpf.split("").every(c => c === cpf[0])
    }

    private retrieveArrayWithFirstNineDigitsFromCPF(cpf: string): Array<number> {
        return cpf.split("")
            .slice(0, Cpf.VALID_CPF_LENGHT - 2)
            .map(digit => parseInt(digit))
    }

    private calculateFirstCheckDigit(partialDigits: Array<number>): number {
        const clonedPartialDigits = [...partialDigits]
        const result = this.multipliesPartialDigits(clonedPartialDigits)
        return this.calculateCheckDigit(result)
    }

    private calculateSecondCheckDigit(partialDigits: Array<number>, firstDigit: number): number {
        const clonedPartialDigits = [...partialDigits]
        clonedPartialDigits.push(firstDigit)
        const result = this.multipliesPartialDigits(clonedPartialDigits)
        return this.calculateCheckDigit(result)
    }

    private multipliesPartialDigits(partialDigits: Array<number>): number {
        return partialDigits
            .reverse()
            .reduce((accumulator, currentValue, index) => currentValue * (Cpf.FACTOR + index) + accumulator, 0)
    }

    private calculateCheckDigit(total: number): number {
        const restDivision = (total % 11)
        return restDivision < 2 ? 0 : 11 - restDivision;
    }

    private hasLastCpfDigitsEqualsCheckDigits(cpf: string, firstDigit: number, secondDigit: number): boolean {
        return cpf.slice(1).slice(-2) == `${firstDigit}${secondDigit}`
    }
}

export { Cpf }
