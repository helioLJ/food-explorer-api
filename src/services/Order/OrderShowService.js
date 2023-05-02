const AppError = require("../../utils/AppError")

class OrderShowService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(order_id) {

    const order = await this.orderRepository.findById(order_id)
    if (!order) {
      throw new AppError('Pedido não encontrado.', 404);
    }

    const dishes = await this.orderRepository.getAllDishes(order_id)

    return { order, dishes }
  }
}

module.exports = OrderShowService