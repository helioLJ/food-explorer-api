const AppError = require("../../utils/AppError")
const FavoriteRepository = require("../../repositories/FavoriteRepository")

class OrderCreateService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(dish_id, user_id) {

    const favoriteRepository = new FavoriteRepository()
    const dish = await favoriteRepository.verifyDish(dish_id)
    const user = await favoriteRepository.verifyUser(user_id)

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    await this.orderRepository.create(dish_id, user_id)
  }
}

module.exports = OrderCreateService