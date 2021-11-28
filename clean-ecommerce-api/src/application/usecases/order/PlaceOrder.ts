import { Customer } from "../../../domain/entity/Customer";
import { DiscountCoupon } from "../../../domain/entity/DiscountCoupon";
import { Order } from "../../../domain/entity/Order";
import { CPFValidator } from "../../../validation/validators/CPFValidator";
import { CPFValidatorError } from "../../../validation/validators/CPFValidatorError";
import { CustomerNotFound } from "../../../validation/validators/CustomerNotFound";

class PlaceOrder {
    private _cpfValidator!: CPFValidator
    private _discountCoupon?: DiscountCoupon
    private _totalOrderCost!: number

    constructor(cpfValidator: CPFValidator, discountCoupon?: DiscountCoupon) {
        this._cpfValidator = cpfValidator
        this._discountCoupon = discountCoupon
    }

    public get totalOrderCost() {
        return this._totalOrderCost
    }

    createOrder(order: Order): Order {
        const { customer } = order
        if (!customer) {
            throw new CustomerNotFound()
        }
        this.validateCustomerDocument(customer)
        const orderTotal = order.calculateTotal()
        this._totalOrderCost = orderTotal

        this.applyDiscount()

        console.log('saving order')
        return order
    }

    validateCustomerDocument(customer: Customer) {
        if (!this._cpfValidator.validate(customer.document)) {
            throw new CPFValidatorError(customer.document)
        }
    }

    applyDiscount() {
        if (this._discountCoupon) {
            this._totalOrderCost -= this._discountCoupon.calculateDiscount(this._totalOrderCost)
        }
    }
}

export { PlaceOrder }
