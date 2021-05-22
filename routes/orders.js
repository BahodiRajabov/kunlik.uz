const router = require("express").Router()
const orderController = require("../controller/orderController")
const validateBody = require("../middlewares/validation/orders")

router.post("/", validateBody, orderController.create)
router.get("/", orderController.findAll)
router.get("/search", orderController.searchByTitle)
router.get("/service/:id", orderController.searchByService)
router.get("/region/:id", orderController.searchByRegions)
router.get("/user/:id", orderController.findByUserId)

module.exports = router