import { Customer } from "./Customer"

class Order {
    private _customer!: Customer
    private _items!: Array<OrderItem>

    constructor(customer: Customer, items: Array<OrderItem>) {
        this._customer = customer
        this._items = items
    }

    public get customer(): Customer {
        return this._customer
    }

    public get items(): Array<OrderItem> {
        return this._items
    }
}

export { Order }
