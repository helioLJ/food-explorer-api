const DishPictureRepository = require("../repositories/DishPictureRepository")
const dishPictureRepository = new DishPictureRepository()

const DishPictureService = require("../services/DishPicure/DishPictureService")


class DishPictureController {
  async update(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params

    const dishPictureService = new DishPictureService(dishPictureRepository)
    const dish = await dishPictureService.execute(user_id, dish_id, request)


    return response.status(200).json(dish)
  }
}

module.exports = DishPictureController