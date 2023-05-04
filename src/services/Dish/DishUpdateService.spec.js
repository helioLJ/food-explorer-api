const AppError = require("../../utils/AppError");
const DishUpdateService = require("./DishUpdateService");
const DishRepositoryInMemory = require("../../repositories/DishRepositoryInMemory");

describe("Dish Update Service", () => {
  let dishRepositoryInMemory = null;
  let dishUpdateService = null;

  beforeEach(() => {
    dishRepositoryInMemory = new DishRepositoryInMemory();
    dishUpdateService = new DishUpdateService(dishRepositoryInMemory);
  });

  it("should not update dish if dish not found", async () => {
    const newName = "Updated test dish";
    const newDescription = "Updated test description";
    const newImageUrl = "http://test.com/updated-image.jpg";
    const newPrice = 15.5;
    const newCategory = "Updated test category";
    const newIngredients = ["Ingredient 3", "Ingredient 4"];
    const dishId = 999; // non-existent dish id
    
    await expect(
      dishUpdateService.execute(
        newName,
        newDescription,
        newImageUrl,
        newPrice,
        newCategory,
        newIngredients,
        dishId
      )
    ).rejects.toEqual(new AppError("Prato não encontrado.", 404));
  });
  
  it("should not update dish without name", async () => {
    const dish = {
      id: 201,
      name: "",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"],
    };

    await expect(
      dishUpdateService.execute(
        dish.name,
        dish.description,
        dish.image_url,
        dish.price,
        dish.category,
        dish.ingredients,
        dish.id
      )
    ).rejects.toEqual(new AppError("Preencha os campos obrigatórios."));
  });

  it("should not update dish without price", async () => {
    const dish = {
      id: 201,
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: null,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"],
    };

    await expect(
      dishUpdateService.execute(
        dish.name,
        dish.description,
        dish.image_url,
        dish.price,
        dish.category,
        dish.ingredients,
        dish.id
      )
    ).rejects.toEqual(new AppError("Preencha os campos obrigatórios."));
  });

  it("should not update dish without ingredients", async () => {
    const dish = {
      id: 201,
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: [],
    };

    await expect(
      dishUpdateService.execute(
    dish.name,
    dish.description,
    dish.image_url,
    dish.price,
    dish.category,
    dish.ingredients,
    dish.id
      )
    ).rejects.toEqual(new AppError("Preencha os campos obrigatórios."));
  });

  it("should not update dish with existing name", async () => {
    const dish = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    }

    const existingDish = {
      name: "Existing dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    }

    // create an initial dish with the same name
    await dishRepositoryInMemory.create(existingDish.name, existingDish.description, existingDish.image_url, existingDish.price, existingDish.category, existingDish.ingredients)

    await expect(dishUpdateService.execute(
      existingDish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients,
      1
    )).rejects.toEqual(new AppError("Já existe um prato cadastrado com esse nome.", 409))
  })

  it("should update dish with valid data", async () => {
    const newName = "Updated test dish";
    const newDescription = "Updated test description";
    const newImageUrl = "http://test.com/updated-image.jpg";
    const newPrice = 15.5;
    const newCategory = "Updated test category";
    const newIngredients = ["Ingredient 3", "Ingredient 4"];
  
    await expect(
      dishUpdateService.execute(
        newName,
        newDescription,
        newImageUrl,
        newPrice,
        newCategory,
        newIngredients,
        201
      )
    ).resolves.not.toThrow();
  
    const updatedDish = await dishRepositoryInMemory.findById(201);

    const updatedIngredients = await dishRepositoryInMemory.getIngredients(201)
    const ingredientsNames = updatedIngredients.map(ingredient => ingredient.name)
  
    expect(updatedDish.name).toBe(newName);
    expect(updatedDish.description).toBe(newDescription);
    expect(updatedDish.image_url).toBe(newImageUrl);
    expect(updatedDish.price).toBe(newPrice);
    expect(updatedDish.category).toBe(newCategory);
    expect(ingredientsNames).toEqual(newIngredients);
  });
});
