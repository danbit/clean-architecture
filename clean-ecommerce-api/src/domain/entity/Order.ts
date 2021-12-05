import { Cpf } from "../../validation/validators/Cpf"
import { DiscountCoupon } from "./DiscountCoupon"
import { Item } from "./Item"
import { OrderItem } from "./OrderItem"

class Order {
    private _items!: Array<OrderItem>

    constructor(readonly cpf: Cpf, readonly discountCoupon?: DiscountCoupon) {
    }

    public get items(): Array<OrderItem> {
        return this._items
    }

    addItem(item: Item, quantity: number) {
        if (!this._items) {
            this._items = []
        }
        this._items.push(new OrderItem(item, quantity))
    }

    calculateTotal(): number {
        let total = this.items.reduce((accumulator, currentValue) =>
            accumulator + (currentValue.quantity * currentValue.item.price), 0)
        if (this.discountCoupon) {
            total -= this.discountCoupon.calculateDiscount(total)
        }
        return total
    }
}

export { Order }
