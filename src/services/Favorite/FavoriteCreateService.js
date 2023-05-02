const AppError = require("../../utils/AppError")

class FavoriteCreateService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute(user_id, dish_id) {

    const dish = await this.favoriteRepository.verifyDish(dish_id)
    const user = await this.favoriteRepository.verifyUser(user_id)

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não encontrado.", 404)
    }

    const favorite = await this.favoriteRepository.verifyFavorite(user_id, dish_id)

    if (favorite) {
      throw new AppError("Prato já foi favoritado pelo usuário.", 400)
    }

    await this.favoriteRepository.create(user_id, dish_id)

    return { user, dish }
  }
}

module.exports = FavoriteCreateService