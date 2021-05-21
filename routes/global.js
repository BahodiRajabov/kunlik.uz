const router = require("express").Router()
const authRoute = require("./auth")
const regionRoute = require("./regions")
const districtRoute = require("./districts")

router.use("/auth", authRoute)
router.use("/regions", regionRoute)
router.use("/districts", districtRoute)

module.exports = router