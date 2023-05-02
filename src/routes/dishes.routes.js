const Router = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const DishesController = require("../controllers/DishesController")
const DishPictureController = require("../controllers/DishPictureController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const dishPictureController = new DishPictureController()

dishesRoutes.post("/", dishesController.create)
dishesRoutes.put("/:dish_id", dishesController.update)
dishesRoutes.patch("/picture/:dish_id", ensureAuthenticated, upload.single("image_url"), dishPictureController.update)
dishesRoutes.delete("/:dish_id", dishesController.delete)
dishesRoutes.get("/:dish_id", dishesController.show)
dishesRoutes.get("/", dishesController.index)

module.exports = dishesRoutes