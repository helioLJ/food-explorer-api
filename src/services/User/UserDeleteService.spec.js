const AppError = require("../../utils/AppError")
const UserDeleteService = require("./UserDeleteService")
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")


describe("User Delete Service", () => {
  let userRepositoryInMemory = null
  let userDeleteService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userDeleteService = new UserDeleteService(userRepositoryInMemory)
  })

  it("should not delete non-existent user", async () => {
    await expect(userDeleteService.execute("non-existent-id")).rejects.toEqual(new AppError("Usuário não encontrado.", 404))
  })

  it("should delete user successfully", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const { id } = await userRepositoryInMemory.create(user.name, user.email, user.password)

    await userDeleteService.execute(id)

    const deletedUser = await userRepositoryInMemory.findById(id)

    expect(deletedUser).toBe(undefined)
  })
})