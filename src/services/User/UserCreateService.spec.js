const AppError = require("../../utils/AppError")
const { compare } = require("bcryptjs")
const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")


describe("User Create Service", () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("should not create user without name", async () => {
    const user = {
      name: "",
      email: "user@test.com",
      password: "123"
    }

    await expect(userCreateService.execute(
      user.name,
      user.email,
      user.password
    )).rejects.toEqual(new AppError("Todos os campos são obrigatórios."))
  })

  it("should not create user without email", async () => {
    const user = {
      name: "User Test",
      email: "",
      password: "123"
    }

    await expect(userCreateService.execute(
      user.name,
      user.email,
      user.password
    )).rejects.toEqual(new AppError("Todos os campos são obrigatórios."))
  })

  it("should not create user without password", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: ""
    }

    await expect(userCreateService.execute(
      user.name,
      user.email,
      user.password
    )).rejects.toEqual(new AppError("Todos os campos são obrigatórios."))
  })

  it("should create user with valid data", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const userCreated = await userCreateService.execute(
      user.name,
      user.email,
      user.password
    )

    expect(userCreated).toHaveProperty("id")
  })

  it("should encrypt password before storing user data", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }

    const userCreated = await userCreateService.execute(
      user.name,
      user.email,
      user.password
    )

    const userFromRepo = await userRepositoryInMemory.findByEmail(user.email)

    expect(userFromRepo.password).not.toEqual(user.password)
    expect(await compare(user.password, userFromRepo.password)).toBe(true)
  })
})
