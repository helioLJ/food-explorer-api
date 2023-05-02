const Router = require("express")

const DishesController = require("../controllers/DishesController")

const dishesRoutes = Router()

const dishesController = new DishesController()

dishesRoutes.post("/", dishesController.create)
dishesRoutes.put("/:dish_id", dishesController.update)
dishesRoutes.delete("/:dish_id", dishesController.delete)
dishesRoutes.get("/:dish_id", dishesController.show)
dishesRoutes.get("/", dishesController.index)

module.exports = dishesRoutes