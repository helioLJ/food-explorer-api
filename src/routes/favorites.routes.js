const Router = require("express")

const FavoritesController = require("../controllers/FavoritesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const favoritesRoutes = Router()

const favoritesController = new FavoritesController()

favoritesRoutes.post("/:dish_id", ensureAuthenticated, favoritesController.create)
favoritesRoutes.delete("/:dish_id", ensureAuthenticated, favoritesController.delete)
favoritesRoutes.get("/", ensureAuthenticated, favoritesController.show)

module.exports = favoritesRoutes