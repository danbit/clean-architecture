import { CPFValidatorError } from "../../src/validation/error/CPFValidatorError"
import { Cpf } from "../../src/validation/validators/Cpf"

test("should validate a valid document", function () {
    expect(() => {
        new Cpf("11144477735")
    }).not.toThrow(CPFValidatorError)
})

test("should validate a valid document with mask", function () {
    expect(() => {
        new Cpf("111.444.777-35")
    }).not.toThrow(CPFValidatorError)
})

test("should validate a invalid document", function () {
    expect(() => {
        new Cpf("11144477700")
    }).toThrow(CPFValidatorError)
})

test("should validate a empty document", function () {
    expect(() => {
        new Cpf("")
    }).toThrow(CPFValidatorError)
})

test("should validate a invalid document greater than 11 digits", function () {
    expect(() => {
        new Cpf("111444777350")
    }).toThrow(CPFValidatorError)
})

test("should validate a invalid document less than 11 digits", function () {
    expect(() => {
        new Cpf("111444777")
    }).toThrow(CPFValidatorError)
})

test("should validate a invalid document with all the same digits", function () {
    expect(() => {
        new Cpf("99999999999")
    }).toThrow(CPFValidatorError)
})
