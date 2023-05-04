const AppError = require("../../utils/AppError");
const OrderCreateService = require("./OrderCreateService");
const OrderRepositoryInMemory = require("../../repositories/OrderRepositoryInMemory");


describe("OrderCreateService", () => {
  let orderRepositoryInMemory;
  let orderCreateService;

  beforeEach(() => {
    orderRepositoryInMemory = new OrderRepositoryInMemory();
    orderCreateService = new OrderCreateService(orderRepositoryInMemory);
  });

  it("should throw an error if dish or user is not found", async () => {
    const dishId = 99;
    const userId = 99;

    await expect(orderCreateService.execute(dishId, userId)).rejects.toEqual(
      new AppError("Prato ou usuário não encontrado.", 404)
    );
  });

  it("should create a new order when dish and user are found", async () => {
    const dishId = 201;
    const userId = 201;

    await expect(orderCreateService.execute(dishId, userId)).resolves.not.toThrow();

    const createdOrder = await orderRepositoryInMemory.findById(2)

    await expect(createdOrder.user_id).toEqual(userId);
  });
});
