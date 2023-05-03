const AppError = require("../../utils/AppError")
const DishRepositoryInMemory = require("../../repositories/DishRepositoryInMemory")
const DishUpdateService = require("./DishUpdateService")

describe("Dish Update Service", () => {
  let dishRepositoryInMemory = null
  let dishUpdateService = null

  beforeEach(() => {
    dishRepositoryInMemory = new DishRepositoryInMemory()
    dishUpdateService = new DishUpdateService(dishRepositoryInMemory)
  })

  it("should not update dish without required fields", async () => {
    const dish = {
      name: "",
      description: "Test description",
      image_url: "",
      price: null,
      category: "Test category",
      ingredients: []
    };
    const dishId = 1;

    await expect(
      dishUpdateService.execute(
        dish.name,
        dish.description,
        dish.image_url,
        dish.price,
        dish.category,
        dish.ingredients,
        dishId
      )
    ).rejects.toEqual(new AppError("Preencha os campos obrigatórios."));
  });

  it("should not update dish without ingredients", async () => {
    const dish = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: [],
      id: "valid_dish_id"
    }

    await expect(dishUpdateService.execute(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients,
      dish.id
    )).rejects.toEqual(new AppError("Preencha os campos obrigatórios."))
  })

  it("should not update dish with an existing name", async () => {
    const dish1 = {
      name: "Test Dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    };
    const dish2 = {
      name: "Test Dish",
      description: "Another test description",
      image_url: "http://test.com/another-image.jpg",
      price: 15.0,
      category: "Another test category",
      ingredients: ["Ingredient 3", "Ingredient 4"]
    };
    const dish1Created = await dishRepositoryInMemory.create(dish1.name,
      dish1.description,
      dish1.image_url,
      dish1.price,
      dish1.category,
      dish1.ingredients
    );
    await dishRepositoryInMemory.create(dish2.name,
      dish2.description,
      dish2.image_url,
      dish2.price,
      dish2.category,
      dish2.ingredients
    );

    await expect(dishUpdateService.execute(
      dish2.name,
      dish1.description,
      dish1.image_url,
      dish1.price,
      dish1.category,
      dish1.ingredients,
      dish1Created.id
    )).rejects.toEqual(new AppError("Já existe um prato cadastrado com esse nome.", 409));
  });

  it("should not update dish with given id is not found", async () => {
    const dish = {
      name: "Test Dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    }

    await dishRepositoryInMemory.create(dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients)

    const invalidId = "invalid_id"
    await expect(dishUpdateService.execute(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients,
      invalidId
    )).rejects.toEqual(new AppError("Prato não encontrado.", 404))
  })

  it("should update an existing dish if all fields are valid", async () => {
    const dish = {
      name: "Test Dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    }
    const createdDish = await dishRepositoryInMemory.create(dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    )

    const updatedDish = {
      ...createdDish,
      name: "Updated Test Dish",
      description: "Updated test description",
      image_url: "http://test.com/updated-image.jpg",
      price: 15.5,
      category: "Updated test category",
      ingredients: ["Ingredient 3", "Ingredient 4"]
    }

    await expect(dishUpdateService.execute(
      updatedDish.name,
      updatedDish.description,
      updatedDish.image_url,
      updatedDish.price,
      updatedDish.category,
      updatedDish.ingredients,
      createdDish.id
    )).resolves.not.toThrow()

    const { ingredientss, ...result } = await dishRepositoryInMemory.findById(createdDish.id)
    const { ingredients, ...formatedUpdatedDish } = updatedDish

    expect(result).toEqual(formatedUpdatedDish)

    const ingredientsResult = await dishRepositoryInMemory.getIngredients(createdDish.id)
    const expectedIngredients = updatedDish.ingredients.map(name => ({ dish_id: createdDish.id, name }))

    const ingredientsResultFormatted = ingredientsResult.map((ingredient) => {
      const {id, ...ingredients} = ingredient
      return ingredients
    })

    expect(ingredientsResultFormatted).toEqual(expect.arrayContaining(expectedIngredients))
  })
})