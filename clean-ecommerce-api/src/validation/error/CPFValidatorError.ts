class CPFValidatorError extends Error {
    constructor(cpf: string) {
        super(`Error on validate cpf ${cpf}`);
        this.name = 'CPFValidatorError'
    }
}

export { CPFValidatorError }
