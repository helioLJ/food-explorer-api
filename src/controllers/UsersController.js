const AppError = require("../utils/AppError")
const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    console.log({ name, email, password });

    if (!name || !email || !password) {
      throw new AppError("Todos os campos são obrigatórios.")
    }

    const user = await knex("users").where("email", email).first();
    if (user) {
      throw new AppError("Este e-mail já está em uso.", 409);
    }

    await knex("users").insert({ name, email, password });

    
    response.status(201).json({ message: "Usuário criado com sucesso!" })
  }
}

module.exports = UsersController