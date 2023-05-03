const AppError = require("../../utils/AppError");
const FavoriteDeleteService = require("./FavoriteDeleteService");
const FavoriteRepositoryInMemory = require("../../repositories/FavoriteRepositoryInMemory");

describe("FavoriteDeleteService", () => {
  let favoriteRepositoryInMemory;
  let favoriteDeleteService;

  beforeEach(() => {
    favoriteRepositoryInMemory = new FavoriteRepositoryInMemory();
    favoriteDeleteService = new FavoriteDeleteService(favoriteRepositoryInMemory);
  });

  it("should throw an error if user_id or dish_id is not provided", async () => {
    const dishId = 1;
    const userId = null;

    await expect(favoriteDeleteService.execute(userId, dishId)).rejects.toEqual(
      new AppError("Os campos user_id e dish_id são obrigatórios", 400)
    );
  });

  it("should throw an error if dish or user is not found", async () => {
    const dishId = 99;
    const userId = 99;

    await expect(favoriteDeleteService.execute(userId, dishId)).rejects.toEqual(
      new AppError("Prato ou usuário não encontrado.", 404)
    );
  });

  it("should throw an error if favorite is not found", async () => {
    const dishId = 202;
    const userId = 201;

    await expect(favoriteDeleteService.execute(userId, dishId)).rejects.toEqual(
      new AppError("Favorito não encontrado", 404)
    );
  });

  it("should delete favorite when all inputs are valid", async () => {
    const dishId = 201;
    const userId = 201;

    await favoriteRepositoryInMemory.create(userId, dishId);
    const deletedFavorite = await favoriteDeleteService.execute(userId, dishId)

    const favorite = await favoriteRepositoryInMemory.verifyFavorite(userId, dishId);

    expect(dishId).toEqual(deletedFavorite.dish.id)
    expect(userId).toEqual(deletedFavorite.user.id)
    expect(favorite).toBeUndefined();
  });
});
