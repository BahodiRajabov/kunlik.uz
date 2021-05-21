const router = require("express").Router()
const authRoute = require("./auth")

router.use("/auth", authRoute)

module.exports = router