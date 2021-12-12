import Dimension from "../../src/domain/entity/Dimension"
import DiscountCoupon from "../../src/domain/entity/DiscountCoupon"
import FixedFreightCalculator from "../../src/domain/entity/FixedFreightCalculator"
import Item from "../../src/domain/entity/Item"
import Order from "../../src/domain/entity/Order"
import { CPFValidatorError } from "../../src/validation/error/CPFValidatorError"

const VALID_DOCUMENT = "11144477735"

const addOrderItems = (order: Order) => {
    order.addItem(new Item(1, 'Item A', 15.99, 1, new Dimension(20, 15, 10)), 2)
    order.addItem(new Item(2, 'Item B', 5.59, 3, new Dimension(100, 30, 10)), 10)
    order.addItem(new Item(3, 'Item C', 139.99, 40, new Dimension(200, 100, 50)), 1)
}

const addOrdemItemsWithouDimension = (order: Order) => {
    order.addItem(new Item(1, 'Item A', 15.99, 1), 2)
    order.addItem(new Item(2, 'Item B', 5.59, 3), 10)
    order.addItem(new Item(3, 'Item C', 139.99, 40), 1)
}

test("should not create a order with invalid CPF", () => {
    expect(() => {
        new Order("00000000000")
    }).toThrow(CPFValidatorError)
})

test("should create a order with 3 items", () => {
    const order = new Order(VALID_DOCUMENT)
    addOrdemItemsWithouDimension(order)
    expect(order.calculateTotal()).toBe(227.87)
})

test("should create a order with 3 items and discount coupon", () => {
    const order = new Order(VALID_DOCUMENT)
    addOrdemItemsWithouDimension(order)
    order.addDiscountCoupon(new DiscountCoupon("BF2021", 10.0))
    expect(order.calculateTotal()).toBe(205.083)
})

test("should not create a order with 3 items and expired discount coupon", () => {
    const order = new Order(VALID_DOCUMENT, new Date("2021-12-10"))
    addOrdemItemsWithouDimension(order)
    order.addDiscountCoupon(new DiscountCoupon("BF2021", 10.0, new Date("2021-12-09")))
    expect(order.calculateTotal()).toBe(227.87)
})

test("should create a order with 3 items and default freight calculator", () => {
    const order = new Order(VALID_DOCUMENT)
    addOrderItems(order)
    const freight = order.getFreight()
    expect(freight).toBe(720)
})

test("should create a order with 3 items and fixed freight calculator", () => {
    const order = new Order(VALID_DOCUMENT, new Date(), new FixedFreightCalculator())
    addOrderItems(order)
    const freight = order.getFreight()
    expect(freight).toBe(130)
})

test("should generate code order", () => {
    const order = new Order(VALID_DOCUMENT, new Date("2021-12-10"))
    order.id = 1
    expect(order.generateCode()).toBe('202100000001')
})

test("should not generate code order without ID", () => {
    const order = new Order(VALID_DOCUMENT, new Date("2021-12-10"))
    expect(() => {
        order.generateCode()
    }).toThrow(Error)
})
