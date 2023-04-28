const AppError = require("../utils/AppError")
const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, description, image_url, price, category, ingredients } = request.body


    if (!name || !image_url || !price || ingredients.length === 0) {
      throw new AppError("Preencha os campos obrigatórios.")
    }
    const dish = await knex("dishes").where("name", name).first();
    if (dish) {
      throw new AppError("Já existe um prato cadastrado com esse nome.", 409);
    }

    const dish_id = await knex("dishes").insert({ name, description, image_url, price, category });
    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dish_id: dish_id[0],
        name: ingredient
      }
    })
    await knex("ingredients").insert(ingredientsInsert)


    response.status(201).json({ message: "Prato criado com sucesso!" })
  }

  async update(request, response) {
    const { name, description, image_url, price, category, ingredients } = request.body
    const { id } = request.params


    if (!name || !image_url || !price || ingredients.length === 0) {
      throw new AppError("Preencha os campos obrigatórios.")
    }
    const dishName = await knex("dishes").where("name", name).first();
    if (dishName) {
      throw new AppError("Já existe um prato cadastrado com esse nome.", 409);
    }
    const dish = await knex("dishes").where("id", id).first();
    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    dish.name = name
    dish.description = description
    dish.image_url = image_url
    dish.price = price
    dish.category = category

    const currentIngredients = await knex("ingredients").where("dish_id", id);
    const newIngredientsInsert = ingredients.filter(ingredient => {
      return !currentIngredients.some(currentIngredient => currentIngredient.name === ingredient);
    }).map(ingredient => {
      return {
        dish_id: id,
        name: ingredient
      };
    });
    const currentIngredientsDelete = currentIngredients.filter(currentIngredient => {
      return !ingredients.some(ingredient => ingredient === currentIngredient.name);
    });
    if (currentIngredientsDelete.length > 0) {
      await Promise.all(currentIngredientsDelete.map(currentIngredient => {
        return knex("ingredients").where("id", currentIngredient.id).delete();
      }));
    }
    await knex("ingredients").insert(newIngredientsInsert);
    await knex("dishes").where("id", id).update(dish);


    return response.status(200).json({ message: "Prato editado com sucesso!" })
  }

  async delete(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where("id", id).first()

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    await knex("dishes").where("id", id).delete()

    return response.status(200).json({ message: "Prato deletado com sucesso!" })

  }

  async show(request, response) {
    const { id } = request.params

    const dish = await knex("dishes").where("id", id).first()

    if (!dish) {
      throw new AppError("Prato não encontrado.", 404)
    }

    const ingredients = await knex("ingredients").select("name").where("dish_id", id)
    const dishWithIngredients = { ...dish, ingredients: ingredients.map(ingredient => ingredient.name) }

    return response.status(200).json(dishWithIngredients)

  }

  async index(request, response) {
    const { category, ingredient, min_price, max_price } = request.query;

    let dishes;
    if (category) {
      dishes = await knex("dishes").where("category", "like", `%${category}%`);
    } else if (ingredient) {
      dishes = await knex("dishes")
        .join("ingredients", "dishes.id", "=", "ingredients.dish_id")
        .where("ingredients.name", "like", `%${ingredient}%`)
        .distinct("dishes.*");
    } else if (min_price || max_price) {
      dishes = await knex('dishes')
        .whereBetween('price', [min_price, max_price]);
    } else {
      dishes = await knex("dishes");
    }

    return response.status(200).json(dishes);
  }


}

module.exports = DishesController