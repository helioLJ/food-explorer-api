class DishPictureRepositoryInMemory {
  constructor() {
    this.users = [];
    this.dishes = [];
  }

  async findUserById(user_id) {
    return this.users.find(user => user.id === user_id);
  }

  async findDishById(dish_id) {
    return this.dishes.find(dish => dish.id === dish_id);
  }

  async update(dish, dish_id) {
    const index = this.dishes.findIndex(dish => dish.id === dish_id);
    if (index === -1) {
      throw new Error(`Dish with id ${dish_id} not found`);
    }
    this.dishes[index] = { ...this.dishes[index], ...dish };
    return this.dishes[index];
  }
}

module.exports = DishPictureRepositoryInMemory;
