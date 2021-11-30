class CPFValidator {
    static readonly VALID_CPF_LENGHT = 11;
    static readonly FACTOR = 2;

    validate(cpf: string) {
        if (!cpf) {
            return false
        }
        const newCpf = this.normalizeCpf(cpf)
        if (newCpf.length != CPFValidator.VALID_CPF_LENGHT) {
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

    normalizeCpf(cpf: string) {
        return cpf.replace(/\D/g, '')
    }

    areAllDigitsTheSame(cpf: string) {
        return cpf.split("").every(c => c === cpf[0])
    }

    retrieveArrayWithFirstNineDigitsFromCPF(cpf: string): Array<number> {
        return cpf.split("")
            .slice(0, CPFValidator.VALID_CPF_LENGHT - 2)
            .map(digit => parseInt(digit))
    }
    
    calculateFirstCheckDigit(partialDigits: Array<number>): number {
        const clonedPartialDigits = [...partialDigits]
        const result = this.multipliesPartialDigits(clonedPartialDigits)
        return this.calculateCheckDigit(result)
    }

    calculateSecondCheckDigit(partialDigits: Array<number>, firstDigit: number): number {
        const clonedPartialDigits = [...partialDigits]
        clonedPartialDigits.push(firstDigit)
        const result = this.multipliesPartialDigits(clonedPartialDigits)
        return this.calculateCheckDigit(result)
    }

    multipliesPartialDigits(partialDigits: Array<number>): number {
        return partialDigits
            .reverse()
            .reduce((accumulator, currentValue, index) => currentValue * (CPFValidator.FACTOR + index) + accumulator, 0)
    }

    calculateCheckDigit(total: number): number {
        const restDivision = (total % 11)
        return restDivision < 2 ? 0 : 11 - restDivision;
    }
        
    hasLastCpfDigitsEqualsCheckDigits(cpf: string, firstDigit: number, secondDigit: number): boolean {
        return cpf.slice(1).slice(-2) == `${firstDigit}${secondDigit}`
    }
}

export { CPFValidator }
