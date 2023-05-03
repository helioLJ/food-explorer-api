const AppError = require("../../utils/AppError")

class OrderCreateService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(dish_id, user_id) {

    const dish = await this.orderRepository.verifyDish(dish_id)
    const user = await this.orderRepository.verifyUser(user_id)

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    await this.orderRepository.create(dish_id, user_id)
  }
}

module.exports = OrderCreateService