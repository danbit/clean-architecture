import { Customer } from '../../../domain/entity/Customer';
import { DiscountCoupon } from '../../../domain/entity/DiscountCoupon';
import { Order } from '../../../domain/entity/Order';
import { OrderItem } from '../../../domain/entity/OrderItem';
import { CPFValidator } from '../../../validation/validators/CPFValidator';
import { CPFValidatorError } from '../../../validation/validators/CPFValidatorError';
import { PlaceOrder } from './PlaceOrder'

const VALID_DOCUMENT = "11144477735"
const orderItems = [
    new OrderItem('Item A', 15.99, 2),
    new OrderItem('Item B', 5.59, 10),
    new OrderItem('Item C', 139.99, 1)
]

test("should not create a order with invalid a customer document", function () {
    const invalidDocument = new Customer("00000000000")
    const order = new Order(invalidDocument);
    const placeOrder = new PlaceOrder(new CPFValidator())        
    
    expect(() => {
        placeOrder.createOrder(order)
    }).toThrow(CPFValidatorError);
})

test("should create a order with 3 items", function () {
    const validCustomer = new Customer(VALID_DOCUMENT)
    const order = new Order(validCustomer);
    orderItems.forEach(item => order.addItem(item))
    const placeOrder = new PlaceOrder(new CPFValidator())        

    placeOrder.createOrder(order)

    expect(placeOrder.totalOrderCost).toBe(227.87)
})

test("should create a order with a discount coupon", function () {
    const validCustomer = new Customer(VALID_DOCUMENT)
    const order = new Order(validCustomer);
    orderItems.forEach(item => order.addItem(item))
    const placeOrder = new PlaceOrder(new CPFValidator(), new DiscountCoupon(10.0))        

    placeOrder.createOrder(order)

    expect(placeOrder.totalOrderCost).toBe(205.083)
})
