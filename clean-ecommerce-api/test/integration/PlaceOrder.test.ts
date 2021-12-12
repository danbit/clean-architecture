import PlaceOrder from "../../src/application/usecases/order/PlaceOrder";
import CouponRepositoryMemory from "../../src/infra/repository/memory/DiscountCouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

test("Should place a order", async function () {
	const itemRepository = new ItemRepositoryMemory();
	const orderRepository = new OrderRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
	const input = {
		cpf: "839.435.452-10",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		date: new Date("2021-12-10"),
		coupon: "VALE20"
	};
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(353.24);
});

test("Should place a order with freight calcule", async function () {
	const itemRepository = new ItemRepositoryMemory();
	const orderRepository = new OrderRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
	const input = {
		cpf: "839.435.452-10",
		orderItems: [
			{ idItem: 4, quantity: 1 },
			{ idItem: 5, quantity: 1 },
			{ idItem: 6, quantity: 3 }
		],
		date: new Date("2021-12-10")
	};
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(1681.55);
});
