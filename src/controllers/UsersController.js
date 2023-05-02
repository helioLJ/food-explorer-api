const UserRepository = require("../repositories/UserRepository")
const userRepository = new UserRepository()

const UserCreateService = require("../services/User/UserCreateService")
const UserUpdateService = require("../services/User/UserUpdateService")
const UserDeleteService = require("../services/User/UserDeleteService")
const UserShowService = require("../services/User/UserShowService")


class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userCreateService = new UserCreateService(userRepository)
    await userCreateService.execute(name, email, password)

    return response.status(201).json({ message: "Usuário criado com sucesso!" })
  }

  async update(request, response) {
    const { name, email, old_password, new_password } = request.body
    const user_id = request.user.id

    const userUpdateService = new UserUpdateService(userRepository)
    await userUpdateService.execute(name, email, old_password, new_password, user_id)

    return response.status(200).json({ message: "Usuário editado com sucesso!" })
  }

  async delete(request, response) {
    const user_id = request.user.id

    const userDeleteService = new UserDeleteService(userRepository)
    await userDeleteService.execute(user_id)

    return response.status(200).json({ message: "Usuário deletado com sucesso!" })

  }

  async show(request, response) {
    const user_id = request.user.id

    const userShowService = new UserShowService(userRepository)
    const userData = await userShowService.execute(user_id)

    return response.status(200).json(userData)
  }
}

module.exports = UsersController