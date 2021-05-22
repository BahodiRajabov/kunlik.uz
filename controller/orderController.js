const Orders = require("../model/Orders")
const ErrorResponse = require("../utils/errorResponse")
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const findAll = async (req, res, next) => {
  try {

    const orders = await Orders.findAll({ limit: req.query.limit || 10, page: req.query.page || 1 })

    res.status(200).json({ data: orders, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const searchByTitle = async (req, res, next) => {
  try {
    const { limit, page, q } = req.query
    const orders = await Orders.searchByTitle({ limit: limit || 10, page: page || 1, title: q })

    res.status(200).json({ data: orders, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const searchByService = async (req, res, next) => {
  try {
    const { limit, page } = req.query
    const orders = await Orders.searchByService({ limit: limit || 10, page: page || 1, s_service_id: req.params.id })

    res.status(200).json({ data: orders, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}


const deleteOne = async (req, res, next) => {
  try {

    const order = await Orders.deleteOne({ order_id: req.params.id })

    res.status(200).json({ data: order, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}


const create = async (req, res, next) => {
  try {

    if (!req.files) throw new ErrorResponse("Image is required", 400)

    let newOrder = req.body

    const imageName = `uploads/${Date.now()}-${uuidv4()}`
    await req.files.image.mv(path.join(__dirname, "../", imageName))

    newOrder.image_src = imageName

    const order = await Orders.create(req.body)

    res.status(201).json({ data: order, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

const findByUserId = async (req, res, next) => {
  try {

    const { id: userId } = req.params

    const orders = await Orders.findByUserId({ user_id: userId })

    res.status(200).json({ data: orders, success: true, msg: "Completed successfully" })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAll,
  findByUserId,
  searchByService,
  deleteOne,
  searchByTitle,
  create
}