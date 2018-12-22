/**
 * Simple middlware to parse the ID param from string to number
 */
const parseParamId = (req, res, next) => {
  if (req.params && req.params.id && !isNaN((+req.params.id)))
    req.params.id = (+req.params.id)
  next()
}

module.exports = {
  parseParamId
}
