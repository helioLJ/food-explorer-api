const AppError = require("../../utils/AppError");
const OrderShowService = require("./OrderShowService");
const OrderRepositoryInMemory = require("../../repositories/OrderRepositoryInMemory");


describe("OrderShowService", () => {
  let orderRepositoryInMemory;
  let orderShowService;

  beforeEach(() => {
    orderRepositoryInMemory = new OrderRepositoryInMemory();
    orderShowService = new OrderShowService(orderRepositoryInMemory);
  });

  it("should throw an error if order is not found", async () => {
    const orderId = 99;

    await expect(orderShowService.execute(orderId)).rejects.toEqual(
      new AppError("Pedido não encontrado.", 404)
    );
  });

  it("should return order and dishes when order is found", async () => {
    const userId = 201;

    const result = await orderShowService.execute(userId);

    expect(result.order.user_id).toEqual(userId);
    expect(result.dishes).toHaveLength(2);
  });
});
