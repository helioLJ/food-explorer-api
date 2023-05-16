class DishIndexService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute(category, ingredientOrName, min_price, max_price) {

    let dishes;
    if (category) {
      dishes = await this.dishRepository.queryByCategory(category)
    } else if (ingredientOrName) {
      const ResultByIngredient = await this.dishRepository.queryByIngredient(ingredientOrName)
      const ResultByName = await this.dishRepository.queryByName(ingredientOrName)
      const merged = [...ResultByIngredient, ...ResultByName];
      // Criar um Set para remover duplicatas
      const uniqueSet = new Set(merged.map(dish => JSON.stringify(dish)));
      // Converter de volta para array
      dishes = Array.from(uniqueSet).map(dish => JSON.parse(dish));

    } else if (min_price || max_price) {
      dishes = await this.dishRepository.queryByPrice(min_price, max_price)
    } else {
      dishes = await this.dishRepository.getAll()
    }

    return dishes
  }
}

module.exports = DishIndexService