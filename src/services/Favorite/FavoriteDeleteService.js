const AppError = require("../../utils/AppError")


class FavoriteDeleteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute(user_id, dish_id) {

    if (!user_id || !dish_id) {
      throw new AppError("Os campos user_id e dish_id são obrigatórios", 400);
    }

    const dish = await this.favoriteRepository.verifyDish(dish_id)
    const user = await this.favoriteRepository.verifyUser(user_id)

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    const favorite = await this.favoriteRepository.verifyFavorite(user_id, dish_id)

    if (!favorite) {
      throw new AppError("Favorito não encontrado", 404);
    }

    await this.favoriteRepository.delete(user_id, dish_id)

    return { user, dish }
  }
}

module.exports = FavoriteDeleteService