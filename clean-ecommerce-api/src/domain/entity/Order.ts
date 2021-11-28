import { Customer } from "./Customer"
import { OrderItem } from "./OrderItem"

class Order {
    private _customer!: Customer
    private _items!: Array<OrderItem>

    constructor(customer: Customer) {
        this._customer = customer
    }

    public get customer(): Customer {
        return this._customer
    }

    public get items(): Array<OrderItem> {
        return this._items
    }

    addItem(item: OrderItem) {
        if(!this._items){
            this._items = []
        }
        this._items.push(item)
    }
}

export { Order }
