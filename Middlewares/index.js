/**
 * Simple middlware to parse the ID param from string to number
 */
const parseParamId = (req, res, next) => {
  if (req.params && req.params.id && !isNaN((+req.params.id)))
    req.params.id = (+req.params.id)
  next()
}
const parseParamObject = (req, res, next) => {
  if (req.query) {
    Object.keys(req.query).forEach(q => {
      if (Array.isArray(req.query[q])) {
        req.query[q] = req.query[q].map(item => {
          try {
            const object = JSON.parse(item)
            return object
          } catch (e) {
            return item
          }
        })
      }
    })
  }
  next()
}

module.exports = {
  parseParamId,
  parseParamObject
}
