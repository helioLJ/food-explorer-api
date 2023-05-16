const AppError = require("../../utils/AppError")
const { hash } = require("bcryptjs")


class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(name, email, password, isAdmin) {

    if (!name || !email || !password) {
      throw new AppError("Todos os campos são obrigatórios.")
    }

    const user = await this.userRepository.findByEmail(email)
    if (user) {
      throw new AppError("Este e-mail já está em uso.", 409)
    }

    const hashedPassword = await hash(password, 8)

    if(isAdmin !== true) {
      isAdmin = false
    }

    console.log(isAdmin);

    return await this.userRepository.create(name, email, hashedPassword, isAdmin)
  }
}

module.exports = UserCreateService