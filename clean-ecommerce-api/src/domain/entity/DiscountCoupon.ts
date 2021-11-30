class DiscountCoupon {
    constructor(readonly percentOff: number) {
    }

    calculateDiscount(totalOrderCost: number) {
        return (totalOrderCost * this.percentOff) / 100
    }
}

export { DiscountCoupon }
