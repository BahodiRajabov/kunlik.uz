const SubSerives = require("../model/SubSerives")
const ErrorResponse = require("../utils/errorResponse")

const create = async (req, res, next) => {
  try {

    const service = await SubSerives.create(req.body)

    res.status(201).json({ data: service, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const findByServiceId = async (req, res, next) => {
  try {

    const services = await SubSerives.findByServiceId({service_id: req.id})

    res.status(200).json({ data: services, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  findByServiceId,
  create
}