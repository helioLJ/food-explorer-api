class FavoriteRepositoryInMemory {
  constructor() {
    this.favorites = [
      { user_id: 201, dish_id: 201 }
    ];

    this.users = [
      {
        name: "User Test",
        email: "user@test.com",
        password: "123",
        id: 201
      }
    ];

    this.dishes = [
      {
        name: "Test Dish 1",
        description: "Test description",
        image_url: "",
        price: 10.5,
        category: "Test category",
        ingredients: ["Ingredient 1", "Ingredient 2"],
        id: 201
      },
      {
        name: "Test Dish 2",
        description: "Test description",
        image_url: "",
        price: 10.5,
        category: "Test category",
        ingredients: ["Ingredient 1", "Ingredient 2"],
        id: 202
      },
      {
        name: "Test Dish 3",
        description: "Test description",
        image_url: "",
        price: 10.5,
        category: "Test category",
        ingredients: ["Ingredient 1", "Ingredient 2"],
        id: 203
      },
    ];
  }

  async verifyDish(dish_id) {
    return this.dishes.find((dish) => dish.id === dish_id);
  }

  async verifyUser(user_id) {
    return this.users.find((us) => us.id === user_id);
  }

  async verifyFavorite(user_id, dish_id) {
    return this.favorites.find((fav) => fav.user_id === user_id && fav.dish_id === dish_id);
  }

  async create(user_id, dish_id) {
    this.favorites.push({ user_id, dish_id });
  }

  async delete(user_id, dish_id) {
    return this.favorites = this.favorites.filter((fav) => !(fav.user_id === user_id && fav.dish_id === dish_id));
  }

  async getDishIds(user_id) {
    return this.favorites.filter((fav) => fav.user_id === user_id).map((fav) => fav);
  }

  async getAll(dishIds) {
    return this.dishes.filter((dish) => dishIds.includes(dish.id));
  }
}

module.exports = FavoriteRepositoryInMemory;
