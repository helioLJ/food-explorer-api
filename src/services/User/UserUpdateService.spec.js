const AppError = require("../../utils/AppError")
const { hash, compare } = require("bcryptjs")
const UserUpdateService = require("./UserUpdateService")
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")


describe("User Update Service", () => {
  let userRepositoryInMemory = null
  let userUpdateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userUpdateService = new UserUpdateService(userRepositoryInMemory)
  })


  it("should not update user with invalid user id", async () => {
    await expect(userUpdateService.execute(
      "User Test",
      "user@test.com",
      null,
      null,
      "invalidId"
    )).rejects.toEqual(new AppError("Usuário não encontrado.", 404))
  })

  it("should not update user with empty name", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const { id } = await userRepositoryInMemory.create(user.name, user.email, user.password)

    await expect(userUpdateService.execute(
      "",
      user.email,
      null,
      null,
      id
    )).rejects.toEqual(new AppError("Os campos não podem estar vazios."))
  })

  it("should not update user with empty email", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const { id } = await userRepositoryInMemory.create(user.name, user.email, user.password)

    await expect(userUpdateService.execute(
      user.name,
      "",
      null,
      null,
      id
    )).rejects.toEqual(new AppError("Os campos não podem estar vazios."))
  })

  it("should not update user with email already in use", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user1@test.com",
      password: "123"
    }

    const user2 = {
      name: "User Test 2",
      email: "user2@test.com",
      password: "123"
    }

    await userRepositoryInMemory.create(user1.name, user1.email, user1.password)
    const { id } = await userRepositoryInMemory.create(user2.name, user2.email, user2.password)

    await expect(userUpdateService.execute(
      user2.name,
      user1.email,
      null,
      null,
      id
    )).rejects.toEqual(new AppError("O email informado já está em uso por outro usuário."))
  })

  it("should not update user with missing old or new password", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const { id } = await userRepositoryInMemory.create(user.name, user.email, user.password)

    await expect(userUpdateService.execute(
      user.name,
      user.email,
      "123",
      null,
      id
    )).rejects.toEqual(new AppError("Preencha a senha antiga e a nova para mudar sua senha."))

    await expect(userUpdateService.execute(
      user.name,
      user.email,
      null,
      "456",
      id
    )).rejects.toEqual(new AppError("Preencha a senha antiga e a nova para mudar sua senha."))
  })

  it("should not update user with wrong old password", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const { id } = await userRepositoryInMemory.create(user.name, user.email, user.password)

    await expect(userUpdateService.execute(
      user.name,
      user.email,
      "wrongPassword",
      "456",
      id
    )).rejects.toEqual(new AppError("A senha antiga não confere."))
  })

  it("should update user name and email", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const userUpdated = {
      name: "User Updated",
      email: "updated@test.com",
    }

    const { id } = await userRepositoryInMemory.create(user.name, user.email, user.password)

    await userUpdateService.execute(
      userUpdated.name,
      userUpdated.email,
      null,
      null,
      id
    )

    const updatedUser = await userRepositoryInMemory.findById(id)

    expect(updatedUser).toHaveProperty("name", userUpdated.name)
    expect(updatedUser).toHaveProperty("email", userUpdated.email)
  })

  it("should update user password", async () => {
    const hashedPassword = await hash("123", 8)

    const user = {
      name: "User Test",
      email: "user@test.com",
      password: hashedPassword
    }

    const newPassword = "456"

    const { id } = await userRepositoryInMemory.create(user.name, user.email, user.password)

    await userUpdateService.execute(
      user.name,
      user.email,
      "123",
      newPassword,
      id
    )

    const updatedUser = await userRepositoryInMemory.findById(id)

    const checkNewPassword = await compare(newPassword, updatedUser.password)

    expect(checkNewPassword).toBe(true)
  })
})