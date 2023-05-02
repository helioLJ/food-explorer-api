const AppError = require("../utils/AppError")
const knex = require("../database/knex");
const DishRepository = require("../repositories/DishRepository")

class DishesController {
  async create(request, response) {
    const { name, description, image_url, price, category, ingredients } = request.body
    const dishRepository = new DishRepository()

    if (!name || !price || ingredients.length === 0) {
      throw new AppError("Preencha os campos obrigatórios.")
    }
    const dish = await dishRepository.findByName(name)
    if (dish) {
      throw new AppError("Já existe um prato cadastrado com esse nome.", 409);
    }

    const dish_id = await dishRepository.create(name, description, image_url, price, category)

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dish_id,
        name: ingredient
      }
    })
    await dishRepository.insertIngredients(ingredientsInsert)


    response.status(201).json({ message: "Prato criado com sucesso!" })
  }

  async update(request, response) {
    const { name, description, image_url, price, category, ingredients } = request.body
    const { dish_id } = request.params
    const dishRepository = new DishRepository()


    if (!name || !image_url || !price || ingredients.length === 0) {
      throw new AppError("Preencha os campos obrigatórios.")
    }
    const dishName = await dishRepository.findByName(name)
    if (dishName) {
      throw new AppError("Já existe um prato cadastrado com esse nome.", 409);
    }
    const dish = await dishRepository.findById(dish_id)
    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    dish.name = name
    dish.description = description
    dish.image_url = image_url
    dish.price = price
    dish.category = category

    const currentIngredients = await dishRepository.getIngredients(dish_id)
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
        return dishRepository.findIngredientById(currentIngredient.id)
      }));
    }

    await dishRepository.insertIngredients(newIngredientsInsert)
    await dishRepository.update(dish_id, dish)


    return response.status(200).json({ message: "Prato editado com sucesso!" })
  }

  async delete(request, response) {
    const { dish_id } = request.params
    const dishRepository = new DishRepository()


    const dish = await dishRepository.findById(dish_id)

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    await dishRepository.delete(dish_id)

    return response.status(200).json({ message: "Prato deletado com sucesso!" })

  }

  async show(request, response) {
    const { dish_id } = request.params
    const dishRepository = new DishRepository()

    const dish = await dishRepository.findById(dish_id)

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    const ingredients = await dishRepository.getIngredientsName(dish_id)
    const dishWithIngredients = { ...dish, ingredients: ingredients.map(ingredient => ingredient.name) }

    return response.status(200).json(dishWithIngredients)

  }

  async index(request, response) {
    const { category, ingredient, min_price, max_price } = request.query;
    const dishRepository = new DishRepository()

    let dishes;
    if (category) {
      dishes = await dishRepository.queryByCategory(category)
    } else if (ingredient) {
      dishes = await dishRepository.queryByIngredient(ingredient)
    } else if (min_price || max_price) {
      dishes = await knex('dishes')
        .whereBetween('price', [min_price, max_price]);
    } else {
      dishes = await dishRepository.getAll()
    }

    return response.status(200).json(dishes);
  }
}

module.exports = DishesController