const knex = require("../database/knex");


class UserRepository {
  async findByEmail(email) {
    return await knex("users").where("email", email).first();
  }

  async findById(user_id) {
    return await knex("users").where("id", user_id).first();
  }

  async create(name, email, password) {
    const [userId] = await knex("users").insert({ name, email, password });
    return { id: userId.id }
  }

  async update(user_id, user) {
    user.updated_at = knex.fn.now();
    await knex("users").where("id", user_id).update(user);
  }
  

  async delete(user_id) {
    await knex("users").where("id", user_id).delete()
  }
}

module.exports = UserRepository