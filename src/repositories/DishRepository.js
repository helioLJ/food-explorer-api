const knex = require("../database/knex");

class DishRepository {
  async findByName(name) {
    return await knex("dishes").where("name", name).first();
  }

  async findById(dish_id) {
    return await knex("dishes").where("id", dish_id).first()
  }

  async create(name, description, image_url, price, category) {
    const [dish] = await knex("dishes").insert({ name, description, image_url, price, category })
    return dish
  }

  async update(dish_id, dish) {
    return await knex("dishes").where("id", dish_id).update(dish);
  }

  async delete(dish_id) {
    return await knex("dishes").where("id", dish_id).delete()
  }

  async getAll() {
    return await knex("dishes")
  }

  async queryByCategory(category) {
    return await knex("dishes").where("category", "like", `%${category}%`);
  }

  async queryByIngredient(ingredient) {
    return await knex("dishes")
      .join("ingredients", "dishes.id", "=", "ingredients.dish_id")
      .where("ingredients.name", "like", `%${ingredient}%`)
      .distinct("dishes.*");
  }

  async queryByPrice(min_price, max_price) {
    return await knex('dishes')
      .whereBetween('price', [min_price, max_price]);
  }

  async insertIngredients(ingredientsInsert) {
    return await knex("ingredients").insert(ingredientsInsert)
  }

  async getIngredients(dish_id) {
    return await knex("ingredients").where("dish_id", dish_id)
  }

  async getIngredientsName(dish_id) {
    return await knex("ingredients").select("name").where("dish_id", dish_id)
  }

  async findIngredientById(currentIngredientId) {
    return knex("ingredients").where("id", currentIngredientId).delete()
  }
}

module.exports = DishRepository