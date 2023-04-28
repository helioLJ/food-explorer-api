const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body


    if (!name || !email || !password) {
      throw new AppError("Todos os campos são obrigatórios.")
    }

    const user = await knex("users").where("email", email).first();
    if (user) {
      throw new AppError("Este e-mail já está em uso.", 409);
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({ name, email, password: hashedPassword });


    response.status(201).json({ message: "Usuário criado com sucesso!" })
  }

  async update(request, response) {
    const { name, email, old_password, new_password } = request.body
    const { id } = request.params


    if (!name || !email) {
      throw new AppError("Os campos não podem estar vazios.")
    }

    const user = await knex("users").where("id", id).first();

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404)
    }

    if (email !== user.email) {
      const userWithEmail = await knex("users").where("email", email).first();
      if (userWithEmail) {
        throw new AppError("O email informado já está em uso por outro usuário.");
      }
    }

    user.name = name
    user.email = email

    if (new_password && !old_password || !new_password && old_password) {
      throw new AppError("Preencha a senha antiga e a nova para mudar sua senha.")
    }

    if (new_password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(new_password, 8)
    }

    await knex("users").where("id", id).update(user);


    return response.status(200).json({ message: "Usuário editado com sucesso!" })
  }

  async delete(request, response) {
    const { id } = request.params

    const user = await knex("users").where("id", id).first()

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404)
    }

    await knex("users").where("id", id).delete()

    return response.status(200).json({ message: "Usuário deletado com sucesso!" })

  }

  async show(request, response) {
    const { id } = request.params

    const user = await knex("users").where("id", id).first()

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404)
    }

    const { password, ...userData } = user

    return response.status(200).json(userData)
  }
}

module.exports = UsersController