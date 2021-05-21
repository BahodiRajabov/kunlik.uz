const router = require("express").Router()
const authController = require("../controller/authController")
const validateBody = require("../middlewares/validation/sign")
const typeRequired = require("../middlewares/validation/typeRequired")

router.post("/login", typeRequired.optional, validateBody ,authController.login, authController.generateToken)
router.post("/register", typeRequired.required, validateBody,  authController.register, authController.generateToken)

module.exports = router