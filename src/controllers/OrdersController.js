const OrderRepository = require("../repositories/OrderRepository")
const orderRepository = new OrderRepository()

const OrderCreateService = require("../services/Order/OrderCreateService")
const OrderDeleteService = require("../services/Order/OrderDeleteService")
const OrderIndexService = require("../services/Order/OrderIndexService")
const OrderShowService = require("../services/Order/OrderShowService")
const OrderUpdateService = require("../services/Order/OrderUpdateService")


class OrdersController {
  async create(request, response) {
    const { dish_id } = request.params
    const { quantity } = request.body
    const user_id = request.user.id

    const orderCreateService = new OrderCreateService(orderRepository)
    await orderCreateService.execute(dish_id, user_id, quantity)

    response.status(201).json({ message: "Pedido criado com sucesso!" })
  }

  async update(request, response) {
    const { order_id } = request.params;
    const { dish_id, quantity, status } = request.body;

    const orderUpdateService = new OrderUpdateService(orderRepository)
    await orderUpdateService.execute(dish_id, order_id, quantity, status)

    return response.status(200).json({ message: "Pedido editado com sucesso!" });
  }

  async show(request, response) {
    const { order_id } = request.params;

    const orderShowService = new OrderShowService(orderRepository)
    const { order, dishes } = await orderShowService.execute(order_id)

    return response.status(200).json({ order, dishes });
  }

  async delete(request, response) {
    const { order_id, dish_id } = request.params;

    const orderDeleteService = new OrderDeleteService(orderRepository)
    await orderDeleteService.execute(dish_id, order_id)

    return response.status(200).json({ message: "Prato removido com sucesso do pedido!" });
  }

  async index(request, response) {
    const user_id = request.user.id

    const orderIndexService = new OrderIndexService(orderRepository)
    const ordersWithDishes = await orderIndexService.execute(user_id)

    return response.status(200).json(ordersWithDishes);
  }
}

module.exports = OrdersController