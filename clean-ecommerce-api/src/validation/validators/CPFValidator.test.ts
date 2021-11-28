import { CPFValidator} from "./CPFValidator";

test("should validate a valid document", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("11144477735")

    expect(validCpf).toBeTruthy()
})

test("should validate a valid document with mask", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("111.444.777-35")

    expect(validCpf).toBeTruthy()
})

test("should validate a invalid document", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("11144477700")

    expect(validCpf).toBeFalsy()
})

test("should validate a empty document", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("")

    expect(validCpf).toBeFalsy()
})

test("should validate a invalid document greater than 11 digits", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("111444777350")

    expect(validCpf).toBeFalsy()
})

test("should validate a invalid document less than 11 digits", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("111444777")

    expect(validCpf).toBeFalsy()
})

test("should validate a invalid document with all the same digits", function () {
    const validator = new CPFValidator()
    const validCpf = validator.validate("99999999999")

    expect(validCpf).toBeFalsy()
})

