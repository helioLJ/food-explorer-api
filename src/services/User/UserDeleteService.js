const AppError = require("../../utils/AppError")


class UserDeleteService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(user_id) {

    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404)
    }

    await this.userRepository.delete(user_id)
  }
}

module.exports = UserDeleteService