const AppError = require("../../utils/AppError")
const UserShowService = require("./UserShowService")
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")


describe("User Show Service", () => {
  let userRepositoryInMemory = null
  let userShowService = null
  let userId = null

  beforeEach(async () => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userShowService = new UserShowService(userRepositoryInMemory)

    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const { id } = await userRepositoryInMemory.create(user.name, user.email, user.password)
    userId = id
  })

  it("should show user data", async () => {
    const user = await userShowService.execute(userId)

    expect(user).toHaveProperty("id")
    expect(user).toHaveProperty("name", "User Test")
    expect(user).toHaveProperty("email", "user@test.com")
    expect(user).not.toHaveProperty("password")
  })

  it("should throw error when user is not found", async () => {
    const wrongUserId = "wrong_id"

    await expect(userShowService.execute(wrongUserId)).rejects.toEqual(new AppError("Usuário não encontrado.", 404))
  })
})
