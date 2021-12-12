class DiscountCoupon {
    constructor(readonly code : string, readonly percentOff: number, readonly expireDate? : Date) {
    }

    calculateDiscount(totalOrderCost: number, today: Date = new Date()) {
        if (this.isExpired(today)){
            return 0
        }
        return (totalOrderCost * this.percentOff) / 100
    }

    isExpired(today: Date = new Date()) : boolean {
        if (!this.expireDate) return false;
        return this.expireDate.getTime() < today.getTime() 
    }
}

export { DiscountCoupon }
