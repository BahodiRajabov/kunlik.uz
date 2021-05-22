const router = require("express").Router()
const subServicesController = require("../controller/subServicesController")
const validateBody = require("../middlewares/validation/subServices")

router.post("/", validateBody, subServicesController.create)
router.get("/:id", subServicesController.findByServiceId)

module.exports = router