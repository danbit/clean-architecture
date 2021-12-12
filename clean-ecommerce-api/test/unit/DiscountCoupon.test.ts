import { DiscountCoupon } from "../../src/domain/entity/DiscountCoupon"

test("Deve criar um cupom de desconto válido", function () {
	const discountCoupon = new DiscountCoupon("VALE20", 20, new Date("2021-12-10"))
	const today = new Date("2021-12-01")
	const isExpirated = discountCoupon.isExpired(today)
	expect(isExpirated).toBeFalsy()
})

test("Deve criar um cupom de desconto expirado", function () {
	const discountCoupon = new DiscountCoupon("VALE20", 20, new Date("2021-03-01"))
	const today = new Date("2021-12-01")
	const isExpired = discountCoupon.isExpired(today)
	expect(isExpired).toBeTruthy()
})

test("Deve criar um cupom de desconto válido e calcular o desconto", function () {
	const discountCoupon = new DiscountCoupon("VALE20", 20)
	const discount = discountCoupon.calculateDiscount(1000)
	expect(discount).toBe(200)
})