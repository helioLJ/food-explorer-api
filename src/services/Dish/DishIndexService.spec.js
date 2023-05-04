const AppError = require("../../utils/AppError")
const DishCreateService = require("./DishCreateService")
const DishIndexService = require("./DishIndexService")
const DishRepositoryInMemory = require("../../repositories/DishRepositoryInMemory")

describe("DishIndexService", () => {
  let dishRepositoryInMemory = null
  let dishCreateService = null
  let dishIndexService = null

  beforeEach(() => {
    dishRepositoryInMemory = new DishRepositoryInMemory()
    dishIndexService = new DishIndexService(dishRepositoryInMemory)
    dishCreateService = new DishCreateService(dishRepositoryInMemory)
  })

  it("should return all dishes if no parameters are provided", async () => {
    const expected = [
      {
        name: 'Test Dish 1',
        description: 'Test description',
        image_url: '',
        price: 10.5,
        category: 'Test category',
      },
      {
        name: 'Test dish 1',
        description: 'Test description 1',
        image_url: 'http://test.com/image1.jpg',
        price: 10.5,
        category: 'Test category 1'
      },
      {
        name: 'Test dish 2',
        description: 'Test description 2',
        image_url: 'http://test.com/image2.jpg',
        price: 15.5,
        category: 'Test category 2'
      }
    ];

    const dishes = [
      {
        name: "Test dish 1",
        description: "Test description 1",
        image_url: "http://test.com/image1.jpg",
        price: 10.5,
        category: "Test category 1",
        ingredients: ["Ingredient 1", "Ingredient 2"]
      },
      {
        name: "Test dish 2",
        description: "Test description 2",
        image_url: "http://test.com/image2.jpg",
        price: 15.5,
        category: "Test category 2",
        ingredients: ["Ingredient 3", "Ingredient 4"]
      }
    ]

    await Promise.all(dishes.map(dish => dishRepositoryInMemory.create(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    )))

    let result = await dishIndexService.execute()
    result = result.map(({ id, ...rest }) => rest);

    expect(result).toEqual(expected)
  })

  it("should return dishes by category if a category is provided", async () => {
    let dishes = [
      {
        name: "Test dish 1",
        description: "Test description 1",
        image_url: "http://test.com/image1.jpg",
        price: 10.5,
        category: "Test category 1",
        ingredients: ["Ingredient 1", "Ingredient 2"]
      },
      {
        name: "Test dish 2",
        description: "Test description 2",
        image_url: "http://test.com/image2.jpg",
        price: 15.5,
        category: "Test category 1",
        ingredients: ["Ingredient 3", "Ingredient 4"]
      }
    ]

    const category = "Test category 1"

    await Promise.all(dishes.map(dish => dishRepositoryInMemory.create(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    )))

    let result = await dishIndexService.execute(category)

    result = result.map(({ id, ...rest }) => rest);
    dishes = dishes.map(({ ingredients, ...rest }) => rest);

    expect(result).toEqual(dishes.filter(dish => dish.category === category))
  })

  it("should return dishes by ingredient if an ingredient is provided", async () => {
    const dish1 = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    };
    const dish2 = {
      name: "Test dish 2",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    };

    await dishCreateService.execute(
      dish1.name,
      dish1.description,
      dish1.image_url,
      dish1.price,
      dish1.category,
      dish1.ingredients
    );

    await dishCreateService.execute(
      dish2.name,
      dish2.description,
      dish2.image_url,
      dish2.price,
      dish2.category,
      dish2.ingredients
    );

    const ingredient = "Ingredient 1"

    const result = await dishIndexService.execute(null, ingredient, null, null)

    expect(result.length).toBe(2)
    expect(result[0].name).toBe(dish1.name)
    expect(result[1].name).toBe(dish2.name)
  })
})