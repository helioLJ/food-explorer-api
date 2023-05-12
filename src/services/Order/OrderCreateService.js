const AppError = require("../../utils/AppError")


class OrderCreateService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(dish_id, user_id, quantity) {

    const dish = await this.orderRepository.verifyDish(dish_id)
    const user = await this.orderRepository.verifyUser(user_id)

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    if(quantity > 10) {
      throw new AppError("Quantidade máxima é 10.", 401)
    }

    return await this.orderRepository.create(dish_id, user_id, quantity)
  }
}

module.exports = OrderCreateService