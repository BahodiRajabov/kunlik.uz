const router = require("express").Router()
const authRoute = require("./auth")
const regionRoute = require("./regions")
const serviceRoute = require("./services")
const ordersRoute = require("./orders")

router.use("/auth", authRoute)
router.use("/regions", regionRoute)
router.use("/services", serviceRoute)
router.use("/orders", ordersRoute)

module.exports = router
