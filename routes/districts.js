const router = require("express").Router()
const districtsController = require("../controller/districtsController")
const validateBody = require("../middlewares/validation/districts")

router.post("/", validateBody, districtsController.create)
router.get("/", districtsController.findAll)
router.get("/:id", districtsController.findByRegionId)
router.get("/:id", districtsController.findById)

module.exports = router