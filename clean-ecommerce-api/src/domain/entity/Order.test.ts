import { CPFValidatorError } from "../../validation/error/CPFValidatorError"
import { ExpiratedDiscountCouponError } from "../../validation/error/ExpiratedDiscountCouponError"
import { Cpf } from "../../validation/validators/Cpf"
import Dimension from "./Dimension"
import { DiscountCoupon } from "./DiscountCoupon"
import { Item } from "./Item"
import { Order } from "./Order"

const VALID_DOCUMENT = "11144477735"

const addValidItems = (order: Order) => {
    order.addItem(new Item('Item A', 15.99, new Dimension(20, 15, 10)), 2)
    order.addItem(new Item('Item B', 5.59, new Dimension(100, 30, 10)), 10)
    order.addItem(new Item('Item C', 139.99, new Dimension(200, 100, 50)), 1)
}

test("should not create a order with invalid CPF", () => {
    expect(() => {
        new Order(new Cpf("00000000000"))
    }).toThrow(CPFValidatorError)
})

test("should create a order with 3 items", () => {
    const order = new Order(new Cpf(VALID_DOCUMENT))
    addValidItems(order)
    expect(order.calculateTotal()).toBe(227.87)
})

test("should create a order with a discount coupon", () => {
    const validExpirationDate = new Date()
    validExpirationDate.setDate(validExpirationDate.getDate() + 7)
    const order = new Order(new Cpf(VALID_DOCUMENT), new DiscountCoupon("BF2021", 10.0, validExpirationDate))
    addValidItems(order)
    expect(order.calculateTotal()).toBe(205.083)
})

test("should not create a order with a expirated discount coupon", () => {
    const expiredDate = new Date()
    expiredDate.setDate(expiredDate.getDate() - 1)
    expect(() => {
        new Order(new Cpf(VALID_DOCUMENT), new DiscountCoupon("BF2021", 10.0, expiredDate))
    }).toThrow(ExpiratedDiscountCouponError)
})
