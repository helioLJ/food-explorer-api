const AppError = require("../utils/AppError")
const FavoriteRepository = require("../repositories/FavoriteRepository")

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params
    const favoriteRepository = new FavoriteRepository()

    const dish = await favoriteRepository.verifyDish(dish_id)
    const user = await favoriteRepository.verifyUser(user_id)

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    const favorite = await favoriteRepository.verifyFavorite(user_id, dish_id)

    if (favorite) {
      throw new AppError("Prato já foi favoritado pelo usuário.", 400)
    }

    await favoriteRepository.create(user_id, dish_id)

    response.status(201).json({ message: `${dish.name} favoritado pelo ${user.name}.` });
  }

  async delete(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params;
    const favoriteRepository = new FavoriteRepository()

    if (!user_id || !dish_id) {
      throw new AppError("Os campos user_id e dish_id são obrigatórios", 400);
    }

    const dish = await favoriteRepository.verifyDish(dish_id)
    const user = await favoriteRepository.verifyUser(user_id)

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    const favorite = await favoriteRepository.verifyFavorite(user_id, dish_id)

    if (!favorite) {
      throw new AppError("Favorito não encontrado", 404);
    }

    await favoriteRepository.delete(user_id, dish_id)

    return response.status(200).json({ message: `${dish.name} desfavoritado pelo ${user.name}.` })
  }

  async show(request, response) {
    const user_id = request.user.id
    const favoriteRepository = new FavoriteRepository()

    const favorites = await favoriteRepository.getDishIds(user_id)
    const dishIds = favorites.map(favorite => favorite.dish_id);
    const dishes = await favoriteRepository.getAll(dishIds)

    return response.status(200).json(dishes);
  }

}


module.exports = FavoritesController