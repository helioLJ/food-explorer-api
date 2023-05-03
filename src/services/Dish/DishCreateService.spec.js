const AppError = require("../../utils/AppError")
const DishCreateService = require("./DishCreateService")
const DishRepositoryInMemory = require("../../repositories/DishRepositoryInMemory")


describe("Dish Create Service", () => {
  let dishRepositoryInMemory = null
  let dishCreateService = null

  beforeEach(() => {
    dishRepositoryInMemory = new DishRepositoryInMemory()
    dishCreateService = new DishCreateService(dishRepositoryInMemory)
  })

  it("should not create dish without name", async () => {
    const dish = {
      name: "",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    }

    await expect(dishCreateService.execute(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    )).rejects.toEqual(new AppError("Preencha os campos obrigatórios."))
  })

  it("should not create dish without price", async () => {
    const dish = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: null,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    }

    await expect(dishCreateService.execute(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    )).rejects.toEqual(new AppError("Preencha os campos obrigatórios."))
  })

  it("should not create dish without ingredients", async () => {
    const dish = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: []
    }

    await expect(dishCreateService.execute(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    )).rejects.toEqual(new AppError("Preencha os campos obrigatórios."))
  })

  it("should create a new dish if all fields are valid", async () => {
    const dish = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    };

    await dishCreateService.execute(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    );

    const createdDish = await dishRepositoryInMemory.findByName(dish.name);
    const createdIngredients = await dishRepositoryInMemory.getIngredients(createdDish.id)

    expect(createdDish).toHaveProperty("id");
    expect(createdDish.name).toEqual(dish.name);
    expect(createdDish.description).toEqual(dish.description);
    expect(createdDish.image_url).toEqual(dish.image_url);
    expect(createdDish.price).toEqual(dish.price);
    expect(createdDish.category).toEqual(dish.category);
    expect(createdIngredients.length).toEqual(dish.ingredients.length);
  });

  it("should not create dish with same name as an existing one", async () => {
    const dish = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    }

    // create an initial dish with the same name
    await dishRepositoryInMemory.create(dish.name, "Another description", "http://test.com/another_image.jpg", 15.5, "Another category")

    // attempt to create the dish with the same name
    await expect(dishCreateService.execute(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    )).rejects.toEqual(new AppError("Já existe um prato cadastrado com esse nome.", 409))
  })
})
