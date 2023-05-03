const AppError = require("../../utils/AppError")

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute(name, description, image_url, price, category, ingredients) {

    if (!name || !price || ingredients.length === 0) {
      throw new AppError("Preencha os campos obrigatórios.")
    }
    const dish = await this.dishRepository.findByName(name)
    if (dish) {
      throw new AppError("Já existe um prato cadastrado com esse nome.", 409);
    }

    const dishCreated = await this.dishRepository.create(name, description, image_url, price, category)

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dish_id: dishCreated.id,
        name: ingredient
      }
    })
    await this.dishRepository.insertIngredients(ingredientsInsert)
  }
}

module.exports = DishCreateService