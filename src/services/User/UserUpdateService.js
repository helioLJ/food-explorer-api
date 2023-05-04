const AppError = require("../../utils/AppError")
const { hash, compare } = require("bcryptjs")


class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(name, email, old_password, new_password, user_id) {

    if (!name || !email) {
      throw new AppError("Os campos não podem estar vazios.")
    }

    const user = await this.userRepository.findById(user_id)
    if (!user) {
      throw new AppError("Usuário não encontrado.", 404)
    }

    if (email !== user.email) {
      const userWithEmail = await this.userRepository.findByEmail(email)
      if (userWithEmail) {
        throw new AppError("O email informado já está em uso por outro usuário.");
      }
    }

    user.name = name
    user.email = email

    if (new_password && !old_password || !new_password && old_password) {
      throw new AppError("Preencha a senha antiga e a nova para mudar sua senha.")
    }

    if (new_password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(new_password, 8)
    }

    await this.userRepository.update(user_id, user)
  }
}

module.exports = UserUpdateService