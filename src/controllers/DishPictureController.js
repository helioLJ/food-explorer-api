const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")
const DishPictureRepository = require("../repositories/DishPictureRepository")

class DishPictureController {
  async update(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params
    const dishPictureRepository = new DishPictureRepository()

    const pictureFilename = request.file.filename
    const diskStorage = new DiskStorage()

    const user = await dishPictureRepository.findUserById(user_id)
    if (!user) {
      throw new AppError("Somente usuários autenticados podem mudar a imagem.", 401)
    }

    const dish = await dishPictureRepository.findDishById(dish_id)
    if (dish.image_url) {
      await diskStorage.deleteFile(dish.image_url)
    }

    const filename = await diskStorage.saveFile(pictureFilename)
    dish.image_url = filename
    await dishPictureRepository.update(dish, dish_id)


    return response.status(200).json(dish)
  }
}

module.exports = DishPictureController