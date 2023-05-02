const AppError = require("../../utils/AppError")

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute(dish_id) {

    const dish = await this.dishRepository.findById(dish_id)

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    await this.dishRepository.delete(dish_id)
    
  }
}

module.exports = DishDeleteService