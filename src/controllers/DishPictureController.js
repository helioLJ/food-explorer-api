const AppError = require("../utils/AppError")
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage")

class DishPictureController {
  async update(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params

    const pictureFilename = request.file.filename
    const diskStorage = new DiskStorage()

    const user = await knex("users").where("id", user_id).first()
    if(!user) {
      throw new AppError("Somente usuários autenticados podem mudar a imagem.", 401)
    }

    const dish = await knex("dishes").where("id", dish_id).first()

    if(dish.image_url) {
      await diskStorage.deleteFile(dish.image_url)
    }

    const filename = await diskStorage.saveFile(pictureFilename)
    dish.image_url = filename
    await knex("dishes").update(dish).where("id", dish_id)


    return response.status(200).json(dish)
  }
}

module.exports = DishPictureController