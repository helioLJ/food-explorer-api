const knex = require("../database/knex");

class OrderRepository {
  async create(dish_id, user_id) {
    const [order_id] = await knex("orders")
      .insert({
        user_id,
        status: "Pendente"
      })
    await knex("ordersDishes").insert({
      order_id,
      dish_id,
      quantity: 1
    })
  }

  async updateStatus(status, order_id) {
    return await knex('orders')
      .where({ id: order_id })
      .update({ status });
  }

  async getAll(user_id) {
    return await knex("orders")
      .select("*")
      .where({ user_id });
  }

  async verifyDishByOrder(order_id, dish_id) {
    return await knex('ordersDishes')
      .where({ order_id, dish_id })
      .first();
  }

  async verifyDish(dish_id) {
    return await knex("dishes").where("id", dish_id).first()
  }

  async verifyUser(user_id) {
    return await knex("users").where("id", user_id).first()
  }

  async updateQuantity(orderDishId, quantity) {
    await knex('ordersDishes')
      .where({ id: orderDishId })
      .update({ quantity });
  }

  async insertDish(order_id, dish_id) {
    return await knex('ordersDishes').insert({ order_id, dish_id, quantity: 1 });
  }

  async findById(order_id) {
    return await knex("orders")
      .select("*")
      .where({ id: order_id })
      .first();
  }

  async getAllDishes(order_id) {
    return await knex("ordersDishes")
      .select("dishes.name", "ordersDishes.quantity")
      .join("dishes", "dishes.id", "ordersDishes.dish_id")
      .where({ order_id });
  }

  async delete(dish_id, order_id) {
    return await knex('ordersDishes')
      .where({ dish_id, order_id })
      .delete();
  }
}

module.exports = OrderRepository