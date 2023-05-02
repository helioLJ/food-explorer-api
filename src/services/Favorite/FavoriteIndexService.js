class FavoriteIndexService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute(user_id) {

    const favorites = await this.favoriteRepository.getDishIds(user_id)
    const dishIds = favorites.map(favorite => favorite.dish_id);
    const dishes = await this.favoriteRepository.getAll(dishIds)

    return dishes
  }
}

module.exports = FavoriteIndexService