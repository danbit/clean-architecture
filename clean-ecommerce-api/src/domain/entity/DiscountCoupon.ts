class DiscountCoupon {
    private _percentOff!: number

    constructor(percentOff: number) {
        this._percentOff = percentOff
    }

    public get percentOff() {
        return this._percentOff
    }

    calculateDiscount(totalOrderCost: number) {
        return (totalOrderCost * this.percentOff) / 100
    }
}

export { DiscountCoupon }
