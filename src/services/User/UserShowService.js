const AppError = require("../../utils/AppError")

class UserShowService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(user_id) {

    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404)
    }

    const { password, ...userData } = user
    return userData
  }
}

module.exports = UserShowService