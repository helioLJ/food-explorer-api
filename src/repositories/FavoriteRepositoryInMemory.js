class FavoriteRepositoryInMemory {
  constructor() {
    this.favorites = [];
  }

  async verifyDish(dish_id) {
    return this.favorites.find((fav) => fav.dish_id === dish_id);
  }

  async verifyUser(user_id) {
    return this.favorites.find((fav) => fav.user_id === user_id);
  }

  async verifyFavorite(user_id, dish_id) {
    return this.favorites.find((fav) => fav.user_id === user_id && fav.dish_id === dish_id);
  }

  async create(user_id, dish_id) {
    this.favorites.push({ user_id, dish_id });
  }

  async delete(user_id, dish_id) {
    this.favorites = this.favorites.filter((fav) => !(fav.user_id === user_id && fav.dish_id === dish_id));
  }

  async getDishIds(user_id) {
    return this.favorites.filter((fav) => fav.user_id === user_id).map((fav) => fav.dish_id);
  }

  async getAll(dishIds) {
    return dishes.filter((dish) => dishIds.includes(dish.id));
  }
}

module.exports = FavoriteRepositoryInMemory;
