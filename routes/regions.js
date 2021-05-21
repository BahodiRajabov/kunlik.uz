const router = require("express").Router()
const authController = require("../controller/regionsController")
const validateBody = require("../middlewares/validation/regions")

router.post("/", validateBody, authController.create)
router.get("/", authController.findAll)
router.get("/:id", authController.findById)

module.exports = router