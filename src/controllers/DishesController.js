const DishRepository = require("../repositories/DishRepository")
const dishRepository = new DishRepository()

const DishCreateService = require("../services/Dish/DishCreateService")
const DishUpdateService = require("../services/Dish/DishUpdateService")
const DishDeleteService = require("../services/Dish/DishDeleteService")
const DishShowService = require("../services/Dish/DishShowService")
const DishIndexService = require("../services/Dish/DishIndexService")

class DishesController {
  async create(request, response) {
    const { name, description, image_url, price, category, ingredients } = request.body

    const dishCreateService = new DishCreateService(dishRepository)
    await dishCreateService.execute(name, description, image_url, price, category, ingredients)

    response.status(201).json({ message: "Prato criado com sucesso!" })
  }

  async update(request, response) {
    const { name, description, image_url, price, category, ingredients } = request.body
    const { dish_id } = request.params

    const dishUpdateService = new DishUpdateService(dishRepository)
    await dishUpdateService.execute(name, description, image_url, price, category, ingredients, dish_id)

    return response.status(200).json({ message: "Prato editado com sucesso!" })
  }

  async delete(request, response) {
    const { dish_id } = request.params

    const dishDeleteService = new DishDeleteService(dishRepository)
    await dishDeleteService.execute(dish_id)

    return response.status(200).json({ message: "Prato deletado com sucesso!" })

  }

  async show(request, response) {
    const { dish_id } = request.params

    const dishShowService = new DishShowService(dishRepository)
    const dishWithIngredients = await dishShowService.execute(dish_id)

    return response.status(200).json(dishWithIngredients)

  }

  async index(request, response) {
    const { category, ingredient, min_price, max_price } = request.query;

    const dishIndexService = new DishIndexService(dishRepository)
    const dishes = await dishIndexService.execute(category, ingredient, min_price, max_price)

    return response.status(200).json(dishes);
  }
}

module.exports = DishesController