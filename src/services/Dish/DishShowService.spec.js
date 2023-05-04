const AppError = require("../../utils/AppError");
const DishShowService = require("./DishShowService");
const DishRepositoryInMemory = require("../../repositories/DishRepositoryInMemory");


describe("Dish Show Service", () => {
  let dishRepositoryInMemory;
  let dishShowService;

  beforeEach(() => {
    dishRepositoryInMemory = new DishRepositoryInMemory();
    dishShowService = new DishShowService(dishRepositoryInMemory);
  });

  it("should throw an error when dish is not found", async () => {
    const nonExistentDishId = "non-existent-dish-id";

    await expect(dishShowService.execute(nonExistentDishId)).rejects.toEqual(
      new AppError("Prato não encontrado.", 404)
    );
  });

  it("should return the dish with its ingredients when found", async () => {
    const dish = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: [ "Ingredient 1", "Ingredient 2" ]
    };

    const createdDish = await dishRepositoryInMemory.create(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category
    );
    const ingredientsInsert = dish.ingredients.map(ingredient => {
      return {
        dish_id: createdDish.id,
        name: ingredient
      }
    })
    const createdIngredients = await dishRepositoryInMemory.insertIngredients(ingredientsInsert)
    const ingredientsArray = createdIngredients.map(ing => ing.name)

    const dishWithIngredients = {
      ...createdDish,
      ingredients: ingredientsArray,
    };

    const result = await dishShowService.execute(createdDish.id);

    expect(result).toEqual(dishWithIngredients);
  });
});


