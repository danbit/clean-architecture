import { CPFValidator} from "./CPFValidator";

test("should validate a valid document", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("11144477735")

    expect(validCpf).toBeTruthy()
})

test("should validate a invalid document", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("11144477700")

    expect(validCpf).toBeFalsy()
})

test("should validate a invalid document greater than 11 digits", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("111444777350")

    expect(validCpf).toBeFalsy()
})
