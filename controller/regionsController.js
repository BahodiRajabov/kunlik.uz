const Regions = require("../model/Regions")
const ErrorResponse = require("../utils/errorResponse")

const findAll = async (req, res, next) => {
  try {

    const regions = await Regions.findAll()

    res.status(200).json({ data: regions, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {

    const region = await Regions.create(req.body)

    res.status(201).json({ data: region, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const findById = async (req, res, next) => {
  try {

    const { id: regionId } = req.params

    const region = await Regions.findById({ region_id: regionId })

    if (!region) throw new ErrorResponse("Not Found", 404)

    res.status(200).json({ data: region, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAll,
  findById,
  create
}