import Cpf from "../../validation/validators/Cpf"
import DefaultFreightCalculator from "./DefaultFreightCalculator"
import DiscountCoupon from "./DiscountCoupon"
import FreightCalculator from "./FreightCalculator"
import Item from "./Item"
import OrderItem from "./OrderItem"

export default class Order {
    private _id : number | undefined;
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

    generateCode() : string {
        if(!this._id) {
            throw new Error('Order ID not found')
        }

        const year = this.createdDate.getFullYear()
        const sequenceOrderWithZeros = this.padLeftZeros(this._id, 8)
        return `${year}${sequenceOrderWithZeros}`
    }
    
    public set id(id : number) {
        this._id = id;
    }    

    getFreight() {
        return this.freight
    }

    // Create Utils?
    private padLeftZeros(input: number, length : number) {
        var zero = length - input.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + input;
      }
}
