const optional = (req, res, next) => {
  req.typeRequired = "optional"; 
  next();
};
const required = (req, res, next) => {
  req.typeRequired = "required"; 
  next();
};

module.exports = {
  optional,
  required
}