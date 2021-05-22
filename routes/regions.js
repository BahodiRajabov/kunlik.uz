const router = require("express").Router()
const regionsController = require("../controller/regionsController")
const validateBody = require("../middlewares/validation/regions")

router.post("/", validateBody, regionsController.create)
router.get("/", regionsController.findAll)
router.get("/:id", regionsController.findById)

module.exports = router