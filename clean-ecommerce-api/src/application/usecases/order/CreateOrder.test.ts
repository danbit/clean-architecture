import { Customer } from '../../../domain/entity/Customer';
import { Order } from '../../../domain/entity/Order';
import { CreateOrder } from './CreateOrder'

test("Should not create a order with invalid a customer document", function () {
    const customer = new Customer()
    customer.document = "012345678901"
    const order = new Order(customer, new Array<OrderItem>());

    const createOrder = new CreateOrder()        
    expect(() => {
        createOrder.addNewOrder(order)
        throw Error("teste")
    }).toThrow(Error);
});