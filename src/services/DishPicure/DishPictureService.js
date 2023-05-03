const AppError = require("../../utils/AppError")
const DiskStorage = require("../../providers/DiskStorage")

class DishPictureService {
  constructor(dishPictureRepository) {
    this.dishPictureRepository = dishPictureRepository
  }

  async execute(user_id, dish_id, request) {

    const pictureFilename = request.file.filename
    const diskStorage = new DiskStorage()

    const user = await this.dishPictureRepository.findUserById(user_id)
    if (!user) {
      throw new AppError("Somente usuários autenticados podem mudar a imagem.", 401)
    }

    const dish = await this.dishPictureRepository.findDishById(dish_id)
    if (dish.image_url) {
      await diskStorage.deleteFile(dish.image_url)
    }

    const filename = await diskStorage.saveFile(pictureFilename)
    dish.image_url = filename
    await this.dishPictureRepository.update(dish, dish_id)
    
    return dish
  }
}

module.exports = DishPictureService