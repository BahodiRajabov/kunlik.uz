const { v4: uuidv4 } = require('uuid');
const { sign } = require("jsonwebtoken")

const Users = require("../model/Users")
const Sessions = require("../model/Sessions")
const { JWT_KEY } = require("../config/config")
const ErrorResponse = require("../utils/errorResponse")

const register = async (req, res, next) => {
  try {
    const { body } = req

    const user = await Users.findByPhoneNumber(body.phone_number)
    if (user) throw new ErrorResponse("User already exist", 400)

    const newUser = await Users.create(body)

    req.user = newUser

    next()

  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { body } = req

    const user = await Users.findByPhoneNumber(body.phone_number)
    if (!user) throw new ErrorResponse("PHONE_NUMBER_OR_PASSWORD_IS_WRONG", 401)

    const { is_valid: isValid } = await Users.comparePassword(body.password, user.password)
    if (!isValid) throw new ErrorResponse("PHONE_NUMBER_OR_PASSWORD_IS_WRONG_", 401)

    req.user = user

    next()

  } catch (error) {
    next(error)
  }

}

const generateToken = async (req, res) => {
  const { user } = req;

  const tokenId = uuidv4();

  const remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const device = req.headers['user-agent'];

  const TOKEN = sign({ role: user.user_role, tokenId, id: user.user_id }, JWT_KEY)

  await Sessions.create({
    user_id: user.user_id,
    token_id: tokenId,
    device: device,
    remote_ip: remoteIp,
  });

  res.status(201).json({
    success: true,
    TOKEN,
    data: user,
  });

};

module.exports = {
  register,
  login,
  generateToken,
}