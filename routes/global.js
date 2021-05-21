const router = require("express").Router()
const authRoute = require("./auth")
const regionRoute = require("./regions")

router.use("/auth", authRoute)
router.use("/regions", regionRoute)

module.exports = router