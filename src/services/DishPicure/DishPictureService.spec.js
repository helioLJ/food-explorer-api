const AppError = require("../../utils/AppError");
const DishPictureService = require("./DishPictureService");
const DishPictureRepositoryInMemory = require("../../repositories/DishPictureRepositoryInMemory");

describe("DishPictureService", () => {
  let dishPictureRepositoryInMemory;
  let dishPictureService;

  beforeEach(() => {
    dishPictureRepositoryInMemory = new DishPictureRepositoryInMemory();
    dishPictureService = new DishPictureService(dishPictureRepositoryInMemory);
  });

  it("should throw an error when user is not authenticated", async () => {
    const user_id = "non-existent-user-id";
    const dish_id = "existing-dish-id";
    const request = { file: { filename: "test-image.jpg" } };

    await expect(dishPictureService.execute(user_id, dish_id, request)).rejects.toEqual(
      new AppError("Somente usuários autenticados podem mudar a imagem.", 401)
    );
  });
});
