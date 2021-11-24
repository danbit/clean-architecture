import { CreateOrder } from './CreateOrder'
import { Order } from '../../entity/Order'
import { Customer } from '../../entity/Customer';

test("Should not create a order with invalid a customer document", function () {
    const customer = new Customer()
    customer.document = "012345678901"
    const order = new Order(customer, new Array<OrderItem>());

    const createOrder = new CreateOrder()        
    expect(() => {
        createOrder.addNewOrder(order)
    }).toThrow(Error);
});