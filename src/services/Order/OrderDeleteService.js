const AppError = require("../../utils/AppError")

class OrderDeleteService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(dish_id, order_id) {

    const dish = await this.orderRepository.verifyDish(dish_id)

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    const order = await this.orderRepository.findById(order_id)
    if (!order) {
      throw new AppError('Pedido não encontrado.', 404);
    }

    await this.orderRepository.delete(dish_id, order_id)

  }
}

module.exports = OrderDeleteService