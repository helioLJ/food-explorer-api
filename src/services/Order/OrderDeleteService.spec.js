const AppError = require("../../utils/AppError");
const OrderDeleteService = require("./OrderDeleteService");
const OrderRepositoryInMemory = require("../../repositories/OrderRepositoryInMemory");


describe("OrderDeleteService", () => {
  let orderRepositoryInMemory;
  let orderDeleteService;

  beforeEach(() => {
    orderRepositoryInMemory = new OrderRepositoryInMemory();
    orderDeleteService = new OrderDeleteService(orderRepositoryInMemory);
  });

  it("should throw an error if dish is not found", async () => {
    const dishId = 99;
    const orderId = 201;

    await expect(orderDeleteService.execute(dishId, orderId)).rejects.toEqual(
      new AppError("Prato não encontrado.", 404)
    );
  });

  it("should throw an error if order is not found", async () => {
    const dishId = 201;
    const orderId = 99;

    await expect(orderDeleteService.execute(dishId, orderId)).rejects.toEqual(
      new AppError("Pedido não encontrado.", 404)
    );
  });

  it("should delete the dish from the order", async () => {
    const dishId = 201;
    const orderId = 201;
    
    await orderDeleteService.execute(dishId, orderId);
    
    const deletedOrder = await orderRepositoryInMemory.verifyDishByOrder(orderId, dishId)

    expect(deletedOrder).toBeUndefined();
  });
});
