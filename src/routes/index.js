const Router = require("express")

const { usersRoutes } = require("./routes/users.routes")

const routes = Router()

routes.use("/users", usersRoutes)

module.exports = routes