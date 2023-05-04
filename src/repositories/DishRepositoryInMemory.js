class DishRepositoryInMemory {
  constructor() {
    this.dishes = [{
      name: "Test Dish 1",
      description: "Test description",
      image_url: "",
      price: 10.5,
      category: "Test category",
      id: 201
    }];
    this.ingredients = [];
  }

  async findByName(name) {
    return this.dishes.find(dish => dish.name === name);
  }

  async findById(dish_id) {
    return this.dishes.find(dish => dish.id === dish_id);
  }

  async create(name, description, image_url, price, category) {
    const dish = { id: this.dishes.length + 1, name, description, image_url, price, category };
    this.dishes.push(dish);
    return dish.id;
  }

  async update(dish_id, updatedDish) {
    const index = this.dishes.findIndex(dish => dish.id === dish_id);
    if (index === -1) {
      return null;
    }
    const dish = { ...this.dishes[index], ...updatedDish };
    this.dishes[index] = dish;
    return dish;
  }

  async delete(dish_id) {
    const index = this.dishes.findIndex(dish => dish.id === dish_id);
    if (index === -1) {
      return null;
    }
    const deletedDish = this.dishes[index];
    this.dishes.splice(index, 1);
    this.ingredients = this.ingredients.filter(ingredient => ingredient.dish_id !== dish_id);
    return deletedDish;
  }

  async getAll() {
    return this.dishes;
  }

  async queryByCategory(category) {
    return this.dishes.filter(dish => dish.category.includes(category));
  }

  async queryByIngredient(ingredient) {
    const dishIds = this.ingredients
      .filter(i => i.name.includes(ingredient))
      .map(i => i.dish_id);
    return this.dishes.filter(dish => dishIds.includes(dish.id));
  }

  async queryByPrice(min_price, max_price) {
    return this.dishes.filter(dish => dish.price >= min_price && dish.price <= max_price);
  }

  async insertIngredients(ingredientsInsert) {
    const ingredients = ingredientsInsert.map((i, index) => {
      return ({
        id: index + 1,
        ...i
      })
    });
    
    this.ingredients.push(...ingredients);

    return ingredients;
  }

  async deleteIngredientsByDishId(dish_id) {
    this.ingredients = this.ingredients.filter(ingredient => ingredient.dish_id !== dish_id);
}

  async getIngredients(dish_id) {
    return this.ingredients.filter(i => i.dish_id === dish_id);
  }

  async getIngredientsName(dish_id) {
    return this.ingredients.filter(i => i.dish_id === dish_id).map(i => i);
  }

  async findIngredientById(currentIngredientId) {
    const index = this.ingredients.findIndex(i => i.id === currentIngredientId);
    if (index === -1) {
      return null;
    }
    const deletedIngredient = this.ingredients[index];
    this.ingredients.splice(index, 1);
    return deletedIngredient;
  }
}

module.exports = DishRepositoryInMemory;
