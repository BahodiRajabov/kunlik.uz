const { verify } = require("jsonwebtoken")
const { JWT_KEY } = require("../../config/config")
const ErrorResponse = require("../../utils/errorResponse")
const Users = require("../../model/Users")
const Sessions = require("../../model/Sessions")

const protect = async (req, res, next) => {
  try {
    let authToken = ""
    const device = req.headers['user-agent'];

    const authorization = req.headers.authorization
    
    if (authorization && authorization.startsWith("Bearer ")) {
      authToken = authorization.split(" ")[1];
    }
    if (!authToken) throw new ErrorResponse("Please login in to get access", 401)

    const decoded = verify(authToken, JWT_KEY)

    const user = await Users.findById(decoded.id)

    if (!user) throw new ErrorResponse("User is not found", 401)

    const session = await Sessions.findByUserId(decoded.id);
  
    if (session.is_logged_out) {
      throw new ErrorResponse('You are not logged in! Please log in to get access.',401)
    } 
    console.log("otdi");
    if (device !== session.device) {
      throw new ErrorResponse("You are not logged in! Please log in to get access. (Device is not correct", 401)
    }

    req.user = user;
    req.decodedToken = decoded;

    next()

  } catch (error) {
    next(error)
  }
}

module.exports = protect