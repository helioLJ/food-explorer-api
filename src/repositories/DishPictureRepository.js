const knex = require("../database/knex");


class DishPictureRepository {
  async findUserById(user_id) {
    return await knex("users").where("id", user_id).first()
  }

  async findDishById(dish_id) {
    return await knex("dishes").where("id", dish_id).first()
  }

  async update(dish, dish_id) {
    return await knex("dishes").update(dish).where("id", dish_id)
  }
}

module.exports = DishPictureRepository