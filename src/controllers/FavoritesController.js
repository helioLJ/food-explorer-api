const AppError = require("../utils/AppError")
const knex = require("../database/knex");

class FavoritesController {
  async create(request, response) {
    const { user_id, dish_id } = request.body

    // Verifica se o prato e o usuário existem
    const dish = await knex("dishes").where("id", dish_id).first()
    const user = await knex("users").where("id", user_id).first()

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    // Verifica se o prato já foi favoritado pelo usuário
    const favorite = await knex("favorites")
      .where("user_id", user_id)
      .andWhere("dish_id", dish_id)
      .first()

    if (favorite) {
      throw new AppError("Prato já foi favoritado pelo usuário.", 400)
    }

    // Insere o favorito na tabela de favoritos
    await knex("favorites").insert({
      user_id,
      dish_id
    })

    response.status(201).json({ message: `${dish.name} favoritado pelo ${user.name}.` });
  }

  async delete(request, response) {
    const { user_id, dish_id } = request.body;

    if (!user_id || !dish_id) {
      throw new AppError("Os campos user_id e dish_id são obrigatórios", 400);
    }

    // Verifica se o prato e o usuário existem
    const dish = await knex("dishes").where("id", dish_id).first()
    const user = await knex("users").where("id", user_id).first()

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    const favorite = await knex("favorites")
      .where({ user_id, dish_id })
      .first();

    if (!favorite) {
      throw new AppError("Favorito não encontrado", 404);
    }

    await knex("favorites")
      .where({ user_id, dish_id })
      .del();

    return response.status(200).json({ message: `${dish.name} desfavoritado pelo ${user.name}.` })
  }

  async show(request, response) {
    const { user_id } = request.params;

    // Busca os dish_id favoritados pelo usuário
    const favorites = await knex("favorites").where("user_id", user_id).select("dish_id");

    // Cria um array com os ids dos pratos
    const dishIds = favorites.map(favorite => favorite.dish_id);

    // Busca os pratos favoritados pelo usuário
    const dishes = await knex("dishes").whereIn("id", dishIds);

    return response.status(200).json(dishes);
  }

}


module.exports = FavoritesController