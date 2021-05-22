const router = require("express").Router()
const servicesController = require("../controller/servicesController")
const validateBody = require("../middlewares/validation/services")

router.post("/", validateBody, servicesController.create)
router.get("/", servicesController.findAll)

module.exports = router