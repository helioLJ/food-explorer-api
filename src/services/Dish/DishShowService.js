const AppError = require("../../utils/AppError")


class DishShowService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute(dish_id) {

    const dish = await this.dishRepository.findById(dish_id)

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    const ingredients = await this.dishRepository.getIngredientsName(dish_id)
    const dishWithIngredients = { ...dish, ingredients: ingredients.map(ingredient => ingredient.name) }
    
    return dishWithIngredients
  }
}

module.exports = DishShowService