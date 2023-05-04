const AppError = require("../../utils/AppError")


class DishUpdateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute(name, description, image_url, price, category, ingredients, dish_id) {

    if (!name || !image_url || !price || ingredients.length === 0) {
      throw new AppError("Preencha os campos obrigatórios.")
    }

    const dishName = await this.dishRepository.findByName(name)
    if (dishName && dishName.id === dish_id) {
      throw new AppError("Já existe um prato cadastrado com esse nome.", 409);
    }

    const dish = await this.dishRepository.findById(dish_id)
    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    dish.name = name
    dish.description = description
    dish.image_url = image_url
    dish.price = price
    dish.category = category

    const currentIngredients = await this.dishRepository.getIngredients(dish_id)
    const newIngredientsInsert = ingredients.filter(ingredient => {
      return !currentIngredients.some(currentIngredient => currentIngredient.name === ingredient);
    }).map(ingredient => {
      return {
        dish_id,
        name: ingredient
      };
    });
    const currentIngredientsDelete = currentIngredients.filter(currentIngredient => {
      return !ingredients.some(ingredient => ingredient === currentIngredient.name);
    });
    if (currentIngredientsDelete.length > 0) {
      await Promise.all(currentIngredientsDelete.map(currentIngredient => {
        return this.dishRepository.findIngredientById(currentIngredient.id)
      }));
    }

    await this.dishRepository.insertIngredients(newIngredientsInsert)
    await this.dishRepository.update(dish_id, dish)
  }
}

module.exports = DishUpdateService