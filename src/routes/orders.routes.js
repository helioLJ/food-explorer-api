const Router = require("express")

const OrdersController = require("../controllers/OrdersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.post("/:dish_id", ensureAuthenticated, ordersController.create)
ordersRoutes.get("/:order_id", ordersController.show)
ordersRoutes.put("/:order_id", ordersController.update)
ordersRoutes.delete("/:order_id", ordersController.delete)
ordersRoutes.get("/", ensureAuthenticated, ordersController.index)

module.exports = ordersRoutes