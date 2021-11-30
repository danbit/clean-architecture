import { Cpf } from "../../validation/validators/Cpf";
import { CPFValidatorError } from "../../validation/validators/CPFValidatorError";
import { DiscountCoupon } from "./DiscountCoupon";
import { Item } from "./Item";
import { Order } from "./Order";

const VALID_DOCUMENT = "11144477735"

const addValidItems = (order: Order) => {
    order.addItem(new Item('Item A', 15.99), 2)
    order.addItem(new Item('Item B', 5.59), 10)
    order.addItem(new Item('Item C', 139.99), 1)
}

test("should not create a order with invalid CPF", function () {
    expect(() => {
        new Order(new Cpf("00000000000"));
    }).toThrow(CPFValidatorError);
})

test("should create a order with 3 items", function () {
    const order = new Order(new Cpf(VALID_DOCUMENT));
    addValidItems(order)
    expect(order.calculateTotal()).toBe(227.87)
})

test("should create a order with a discount coupon", function () {
    const order = new Order(new Cpf(VALID_DOCUMENT), new DiscountCoupon(10.0));
    addValidItems(order)
    expect(order.calculateTotal()).toBe(205.083)
})
