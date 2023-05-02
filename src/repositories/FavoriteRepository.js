const knex = require("../database/knex");

class FavoriteRepository {
  async verifyDish(dish_id) {
    return await knex("dishes").where("id", dish_id).first()
  }

  async verifyUser(user_id) {
    return await knex("users").where("id", user_id).first()
  }

  async verifyFavorite(user_id, dish_id) {
    return await knex("favorites")
      .where("user_id", user_id)
      .andWhere("dish_id", dish_id)
      .first()
  }

  async create(user_id, dish_id) {
    return await knex("favorites").insert({
      user_id,
      dish_id
    })
  }

  async delete(user_id, dish_id) {
    return await knex("favorites")
      .where({ user_id, dish_id })
      .del();
  }

  async getDishIds(user_id) {
    return await knex("favorites").where("user_id", user_id).select("dish_id");
  }

  async getAll(dishIds) {
    return await knex("dishes").whereIn("id", dishIds);
  }
}

module.exports = FavoriteRepository