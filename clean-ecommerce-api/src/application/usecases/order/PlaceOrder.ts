// import { Customer } from "../../../domain/entity/Customer";
// import { DiscountCoupon } from "../../../domain/entity/DiscountCoupon";
// import { Order } from "../../../domain/entity/Order";
// import { Cpf } from "../../../validation/validators/Cpf";
// import { CPFValidatorError } from "../../../validation/validators/CPFValidatorError";
// import { CustomerNotFound } from "../../../validation/validators/CustomerNotFound";

// class PlaceOrder {
//     private _totalOrderCost!: number

//     constructor(readonly cpf: Cpf, readonly discountCoupon?: DiscountCoupon) {
//     }

//     public get totalOrderCost() {
//         return this._totalOrderCost
//     }

//     createOrder(order: Order): Order {
//         const { customer } = order
//         if (!customer) {
//             throw new CustomerNotFound()
//         }
//         this.validateCustomerDocument(customer)
//         const orderTotal = order.calculateTotal()
//         this._totalOrderCost = orderTotal

//         this.applyDiscount()

//         console.log('saving order')
//         return order
//     }

//     validateCustomerDocument(customer: Customer) {
//         if (!this.cpf.validate(customer.document)) {
//             throw new CPFValidatorError(customer.document)
//         }
//     }

//     applyDiscount() {
//         if (this.discountCoupon) {
//             this._totalOrderCost -= this.discountCoupon.calculateDiscount(this._totalOrderCost)
//         }
//     }
// }

// export { PlaceOrder }
