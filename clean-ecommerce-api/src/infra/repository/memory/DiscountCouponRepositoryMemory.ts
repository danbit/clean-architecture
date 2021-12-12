import DiscountCoupon from "../../../domain/entity/DiscountCoupon";
import DiscountCouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements DiscountCouponRepository {
	coupons: DiscountCoupon[];

	constructor () {
		this.coupons = [
			new DiscountCoupon("VALE20", 20)
		]
	}

	findByCode(code: string): Promise<DiscountCoupon | undefined> {
		return Promise.resolve(this.coupons.find(coupon => coupon.code === code));
	}
}
