import { ExpiratedDiscountCouponError } from "../../validation/error/ExpiratedDiscountCouponError"

class DiscountCoupon {
    constructor(readonly code : string, readonly percentOff: number, readonly expirationDate : Date) {
        if(this.isExpirated()){
            throw new ExpiratedDiscountCouponError(code)
        }
    }

    calculateDiscount(totalOrderCost: number) {        
        return (totalOrderCost * this.percentOff) / 100
    }

    isExpirated() : boolean {
        console.log('this.expirationDate', this.expirationDate)
        return this.expirationDate <= new Date() 
    }
}

export { DiscountCoupon }
