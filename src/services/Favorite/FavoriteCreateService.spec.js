const AppError = require("../../utils/AppError");
const FavoriteCreateService = require("./FavoriteCreateService");
const FavoriteRepositoryInMemory = require("../../repositories/FavoriteRepositoryInMemory");

describe("FavoriteCreateService", () => {
  let favoriteRepositoryInMemory;
  let favoriteCreateService;

  beforeEach(() => {
    favoriteRepositoryInMemory = new FavoriteRepositoryInMemory();
    favoriteCreateService = new FavoriteCreateService(favoriteRepositoryInMemory);
  });

  it("should throw an error if dish or user is not found", async () => {
    const dishId = 99;
    const userId = 99;

    await expect(favoriteCreateService.execute(userId, dishId)).rejects.toEqual(
      new AppError("Prato ou usuário não encontrado.", 404)
    );
  });

  it("should create a new favorite when dish and user are found and it wasn't favorited before", async () => {
    const dishId = 202;
    const userId = 201;

     await favoriteCreateService.execute(userId, dishId)

    expect(favoriteRepositoryInMemory.favorites).toHaveLength(2);
  });

  it("should throw an error if dish was already favorited by the user", async () => {
    const dishId = 201;
    const userId = 201;

    await favoriteRepositoryInMemory.create(userId, dishId);

    await expect(favoriteCreateService.execute(userId, dishId)).rejects.toEqual(
      new AppError("Prato já foi favoritado pelo usuário.", 400)
    );
  });
});
