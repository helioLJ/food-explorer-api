class DishIndexService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute(category, ingredient, min_price, max_price) {

    let dishes;
    if (category) {
      dishes = await this.dishRepository.queryByCategory(category)
    } else if (ingredient) {
      dishes = await this.dishRepository.queryByIngredient(ingredient)
    } else if (min_price || max_price) {
      dishes = await this.dishRepository.queryByPrice(min_price, max_price)
    } else {
      dishes = await this.dishRepository.getAll()
    }
    
    return dishes
  }
}

module.exports = DishIndexService