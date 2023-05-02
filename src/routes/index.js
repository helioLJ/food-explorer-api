const Router = require("express")

const routes = Router()

const usersRoutes = require("./users.routes")
const dishesRoutes = require("./dishes.routes")
const favoritesRoutes = require("./favorites.routes")
const ordersRoutes = require("./orders.routes")
const sessionsRoutes = require("./sessions.routes")

routes.use("/users", usersRoutes)
routes.use("/dishes", dishesRoutes)
routes.use("/favorites", favoritesRoutes)
routes.use("/orders", ordersRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes