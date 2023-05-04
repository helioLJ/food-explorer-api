const AppError = require("../../utils/AppError")


class OrderUpdateService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(dish_id, order_id, quantity, status) {

    const dish = await this.orderRepository.verifyDish(dish_id)

    if(quantity < 1) {
      throw new AppError("Quantidade menor que 1, se quiser deletar o prato use o método Delete.", 401)
    }

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    const order = await this.orderRepository.findById(order_id)
    if (!order) {
      throw new AppError('Pedido não encontrado.', 404);
    }

    if (status) {
      await this.orderRepository.updateStatus(status, order_id)
    } else {
      const orderDish = await this.orderRepository.verifyDishByOrder(order_id, dish_id)

      if (!orderDish) {
        await this.orderRepository.insertDish(order_id, dish_id)
      } else {
        await this.orderRepository.updateQuantity(orderDish.id, quantity)
      }
    }
  }
}

module.exports = OrderUpdateService