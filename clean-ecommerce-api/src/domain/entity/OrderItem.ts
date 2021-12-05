import { Item } from "./Item";

class OrderItem {
    constructor(readonly item: Item, readonly quantity: number) {
    }
}

export { OrderItem }
