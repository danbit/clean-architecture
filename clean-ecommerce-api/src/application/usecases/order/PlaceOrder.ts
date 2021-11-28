import { Customer } from "../../../domain/entity/Customer";
import { Order } from "../../../domain/entity/Order";
import { CPFValidator } from "../../../validation/validators/CPFValidator";
import { CPFValidatorError } from "../../../validation/validators/CPFValidatorError";
import { CustomerNotFound } from "../../../validation/validators/CustomerNotFound";

class PlaceOrder {
    private _cpfValidator!: CPFValidator
    private _total!: number

    constructor(cpfValidator: CPFValidator) {
        this._cpfValidator = cpfValidator
    }

    public get total() {
        return this._total
    }

    createOrder(order: Order) {
        const { customer } = order
        if (!customer) {
            throw new CustomerNotFound()
        }
        this.validateCustomerDocument(customer)
        this.calculateOrderTotal(order)
    }

    validateCustomerDocument(customer: Customer) {
        if (!this._cpfValidator.validate(customer.document)) {
            throw new CPFValidatorError(customer.document)
        }
    }

    calculateOrderTotal(order: Order) {
        const orderTotal = order.items.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.quantity * currentValue.price);
        }, 0);
        this._total = orderTotal
    }
}

export { PlaceOrder }
