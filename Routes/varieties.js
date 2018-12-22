const express = require('express')
const router = express.Router()
const validator = require('express-joi-validation')({ passError: true })
const schemas = require('../Helpers/schemas')
const middlewares = require('../Middlewares')
const controller = require('../Controllers/VarietiesController')

/**
 * 
 * Every route we attach a middlware to verify the type of data sent
 * For the routes that we send the ID param, we parse the ID as a number using `parseParamId`
 * We process every route with the adequat controller's action
 * 
 * validator.body: Validates the body of the request using the schemas we define above
 * validator.params: Vaidates the params of the request
 * validator.query: valudates the queryParams of the request
 * 
 */

const verieties = path => {
  
  router.get(`${path}`,
    validator.query(schemas.all.query),
    controller.get
  )
  router.get(`${path}/:id`,
    validator.params(schemas.find.params),
    middlewares.parseParamId,
    controller.find
  )
  router.post(`${path}`,
    validator.body(schemas.create.body),
    controller.create
  )
  router.put(`${path}/:id`,
    validator.params(schemas.update.params),
    validator.body(schemas.update.body),
    middlewares.parseParamId,
    controller.update
  )
  router.delete(`${path}/:id`,
    validator.params(schemas.remove.params),
    middlewares.parseParamId,
    controller.delete
  )

  return router
}



module.exports = verieties
