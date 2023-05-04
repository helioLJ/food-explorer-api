const AppError = require("../../utils/AppError")
const DishDeleteService = require("./DishDeleteService")
const DishRepositoryInMemory = require("../../repositories/DishRepositoryInMemory")


describe("DishDeleteService", () => {
  let dishRepositoryInMemory = null
  let dishDeleteService = null

  beforeEach(() => {
    dishRepositoryInMemory = new DishRepositoryInMemory()
    dishDeleteService = new DishDeleteService(dishRepositoryInMemory)
  })

  it("should throw an error if dish is not found", async () => {
    const nonExistingDishId = "non-existing-id"

    await expect(dishDeleteService.execute(nonExistingDishId)).rejects.toEqual(new AppError("Prato não encontrado.", 404))
  })

  it("should delete a dish if it exists", async () => {
    const dish = {
      name: "Test dish",
      description: "Test description",
      image_url: "http://test.com/image.jpg",
      price: 10.5,
      category: "Test category",
      ingredients: ["Ingredient 1", "Ingredient 2"]
    }

    const createdDish = await dishRepositoryInMemory.create(
      dish.name,
      dish.description,
      dish.image_url,
      dish.price,
      dish.category,
      dish.ingredients
    )

    await dishDeleteService.execute(createdDish)

    const deletedDish = await dishRepositoryInMemory.findById(createdDish)
    expect(deletedDish).toBeUndefined()
  })
})
