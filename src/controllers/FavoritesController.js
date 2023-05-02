const AppError = require("../utils/AppError")

const FavoriteRepository = require("../repositories/FavoriteRepository")
const favoriteRepository = new FavoriteRepository()

const FavoriteCreateService = require("../services/Favorite/FavoriteCreateService")
const FavoriteDeleteService = require("../services/Favorite/FavoriteDeleteService")
const FavoriteIndexService = require("../services/Favorite/FavoriteIndexService")

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params

    const favoriteCreateService = new FavoriteCreateService(favoriteRepository)
    const { user, dish } = await favoriteCreateService.execute(user_id, dish_id)

    response.status(201).json({ message: `${dish.name} favoritado pelo ${user.name}.` });
  }

  async delete(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params;

    const favoriteDeleteService = new FavoriteDeleteService(favoriteRepository)
    const { user, dish } = await favoriteDeleteService.execute(user_id, dish_id)

    return response.status(200).json({ message: `${dish.name} desfavoritado pelo ${user.name}.` })
  }

  async index(request, response) {
    const user_id = request.user.id

    const favoriteIndexService = new FavoriteIndexService(favoriteRepository)
    const dishes = await favoriteIndexService.execute(user_id)

    return response.status(200).json(dishes);
  }

}


module.exports = FavoritesController