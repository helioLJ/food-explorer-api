const Router = require("express")

const OrdersController = require("../controllers/OrdersController")

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.post("/:user_id", ordersController.create)
ordersRoutes.get("/:order_id", ordersController.show)
ordersRoutes.put("/:order_id", ordersController.update)
ordersRoutes.get("/index/:user_id", ordersController.index)
ordersRoutes.delete("/", ordersController.delete)

module.exports = ordersRoutes