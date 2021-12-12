import DiscountCoupon from "../entity/DiscountCoupon";

export default interface DiscountCouponRepository {
	findByCode(code: string): Promise<DiscountCoupon | undefined>;
}
