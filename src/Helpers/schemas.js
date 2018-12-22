const Joi = require('joi')

/**
 *
 * Schemas for our main routes!
 * Each route can have 3 schemas (params, query and body)
 * each schema sets validation rules to the data that request contains
 *
 */

const Schemas = {
  all: {
    params: {},
    query: {
      name: Joi.string(),
      bean_size: Joi.string(),
      quality_potential: Joi.string(),
      yield: Joi.string(),
      leaf_rust: Joi.string(),
      coffee_berry_disease: Joi.string(),
      nematodes: Joi.string(),
      producing_countries: Joi.array().items(Joi.string())
    },
    body: {}
  },
  find: {
    params: {
      id: Joi.number().required()
    },
    query: {},
    body: {}
  },
  create: {
    params: {},
    query: {},
    body: {
      name: Joi.string().required(),
      bean_size: Joi.string().required(),
      quality_potential: Joi.string().required(),
      yield: Joi.string().required(),
      disease_resistancy: Joi.array().items(Joi.object()).required(),
      producing_countries: Joi.array().items(Joi.string()).required()
    }
  },
  update: {
    params: {
      id: Joi.number().required()
    },
    query: {},
    body: {
      name: Joi.string(),
      bean_size: Joi.string(),
      quality_potential: Joi.string(),
      yield: Joi.string(),
      disease_resistancy: Joi.array().items(Joi.object()),
      producing_countries: Joi.array().items(Joi.string())
    }
  },
  remove: {
    params: {
      id: Joi.number().required()
    },
    query: {},
    body: {}
  }
}
module.exports = Schemas
