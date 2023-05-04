const AppError = require("../../utils/AppError");
const OrderUpdateService = require("./OrderUpdateService");
const OrderRepositoryInMemory = require("../../repositories/OrderRepositoryInMemory");


describe("OrderUpdateService", () => {
  let orderRepositoryInMemory;
  let orderUpdateService;

  beforeEach(() => {
    orderRepositoryInMemory = new OrderRepositoryInMemory();
    orderUpdateService = new OrderUpdateService(orderRepositoryInMemory);
  });

  it("should throw an error if quantity is less than 1", async () => {
    const dishId = 201;
    const orderId = 201;
    const quantity = 0;
    const status = null;
  
    await expect(orderUpdateService.execute(dishId, orderId, quantity, status)).rejects.toEqual(
      new AppError("Quantidade menor que 1, se quiser deletar o prato use o método Delete.", 401)
    );
  });

  it("should throw an error if dish is not found", async () => {
    const dishId = 99;
    const orderId = 1;
    const quantity = 2;
    const status = null;

    await expect(orderUpdateService.execute(dishId, orderId, quantity, status)).rejects.toEqual(
      new AppError("Prato não encontrado.", 404)
    );
  });

  it("should throw an error if order is not found", async () => {
    const dishId = 201;
    const orderId = 99;
    const quantity = 2;
    const status = null;

    await expect(orderUpdateService.execute(dishId, orderId, quantity, status)).rejects.toEqual(
      new AppError("Pedido não encontrado.", 404)
    );
  });

  it("should update order status when status is provided", async () => {
    const dishId = 201;
    const orderId = 201;
    const quantity = 1;
    const status = "Entregue";

    await orderUpdateService.execute(dishId, orderId, quantity, status);
    const order = await orderRepositoryInMemory.findById(orderId);
    expect(order.status).toEqual(status);
  });

  it("should insert a new order dish when it does not exist in the order", async () => {
    const dishId = 201;
    const orderId = 201;
    const quantity = 2;
    const status = null;

    await orderUpdateService.execute(dishId, orderId, quantity, status);
    const orderDish = await orderRepositoryInMemory.verifyDishByOrder(orderId, dishId);
    expect(orderDish.quantity).toEqual(quantity);
  });

  it("should update order dish quantity when it already exists in the order", async () => {
    const dishId = 201;
    const orderId = 201;
    const quantity = 3;
    const status = null;

    await orderUpdateService.execute(dishId, orderId, quantity, status);
    const orderDish = await orderRepositoryInMemory.verifyDishByOrder(orderId, dishId);
    expect(orderDish.quantity).toEqual(quantity);
  });
});
