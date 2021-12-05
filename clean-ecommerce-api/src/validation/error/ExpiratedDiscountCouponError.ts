class ExpiratedDiscountCouponError extends Error {
    constructor(code: string) {
        super(`Coupon ${code} expirated`);
        this.name = 'ExpiratedDiscountCouponError'
    }
}

export { ExpiratedDiscountCouponError }
