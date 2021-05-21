const router = require("express").Router()
const regionsController = require("../controller/regionsController")
const validateBody = require("../middlewares/validation/regions")
const protecRoute = require("../middlewares/auth/protect")

router.post("/", validateBody, regionsController.create)
router.get("/", regionsController.findAll)
router.get("/:id", regionsController.findById)

module.exports = router