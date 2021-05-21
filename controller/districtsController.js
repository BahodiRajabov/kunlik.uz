const Districts = require("../model/Districts")
const ErrorResponse = require("../utils/errorResponse")

const findAll = async (req, res, next) => {
  try {

    const districts = await Districts.findAll()

    res.status(200).json({ data: districts, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {

    const district = await Districts.create(req.body)

    res.status(201).json({ data: district, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const findById = async (req, res, next) => {
  try {

    const { id: districtId } = req.params

    const district = await Districts.findById({ district_id: districtId })

    if (!district) throw new ErrorResponse("Not Found", 404)

    res.status(200).json({ data: district, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const findByRegionId = async (req, res, next) => {
  try {

    const { id: regionId } = req.params

    const districts = await Districts.findByRegionId({ region_id: regionId })

    res.status(200).json({ data: districts, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAll,
  findById,
  findByRegionId,
  create
}