import Cpf from "../../validation/validators/Cpf"
import DefaultFreightCalculator from "./DefaultFreightCalculator"
import DiscountCoupon from "./DiscountCoupon"
import FreightCalculator from "./FreightCalculator"
import Item from "./Item"
import OrderItem from "./OrderItem"

export default class Order {
    private orderItems!: Array<OrderItem>
    private freight: number;
    cpf: Cpf
    discountCoupon: DiscountCoupon | undefined;

    constructor(cpf: string, readonly createdDate: Date = new Date(), readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()) {
        this.cpf = new Cpf(cpf)
        this.orderItems = []
        this.freight = 0
    }

    public get items(): Array<OrderItem> {
        return this.orderItems
    }

    addItem(item: Item, quantity: number) {
        this.freight += this.freightCalculator.calculate(item) * quantity
        this.orderItems.push(new OrderItem(item.id, item.price, quantity))
    }

    addDiscountCoupon(discountCoupon: DiscountCoupon) {
        if (discountCoupon.isExpired(this.createdDate)) {
            return
        }
        this.discountCoupon = discountCoupon
    }

    calculateTotal(): number {
        let total = this.orderItems.reduce((accumulator, currentValue) => accumulator + currentValue.getTotal(), 0)
        if (this.discountCoupon) {
            total -= this.discountCoupon.calculateDiscount(total)
        }
        total += this.freight
        return total
    }

    getFreight() {
        return this.freight
    }
}
