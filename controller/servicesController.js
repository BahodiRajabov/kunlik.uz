const Services = require("../model/Services")
const ErrorResponse = require("../utils/errorResponse")
const { v4: uuidv4 } = require('uuid');
const path= require('path');


const findAll = async (req, res, next) => {
  try {

    const services = await Services.findAll()

    res.status(200).json({ data: services, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {

    if (!req.files ) throw new ErrorResponse("Image is required", 400)

    let newService = req.body

    const imageName = `uploads/${Date.now()}-${uuidv4()}`
    await req.files.image.mv(path.join(__dirname, "../", imageName))

    newService.image_src = imageName

    const service = await Services.create(newService)

    res.status(201).json({ data: service, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAll,
  create
}