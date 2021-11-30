import { Customer } from "./Customer"
import { OrderItem } from "./OrderItem"

class Order {
    private _items!: Array<OrderItem>

    constructor(readonly customer: Customer) {
    }

    public get items(): Array<OrderItem> {
        return this._items
    }

    addItem(item: OrderItem) {
        if (!this._items) {
            this._items = []
        }
        this._items.push(item)
    }

    calculateTotal(): number {
        return this.items.reduce((accumulator, currentValue) =>
            accumulator + (currentValue.quantity * currentValue.price), 0)
    }
}

export { Order }
