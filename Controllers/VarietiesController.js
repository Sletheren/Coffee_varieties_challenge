const responses = require('../Helpers/responses')
const Database = require('../Database')
const DB = new Database()

/**
 * The main controller of our application.
 * There is not much request verification since I've done that using the request validaiton middlware (check Routes)
 * We use the reponses helper to normalize the response we send on each action
 */
const Controller = {
  get: (req, res) => {
    /* If there are query params we perform A search rather than getting all the varieties */
    if (Object.keys(req.query).length === 0) {
      const result = DB.getAll()
      res.json(responses.success(result))
    } else {
      const result = DB.findByProps(req.query)
      res.json(responses.success(result))
    }
  },
  find: (req, res) => {
    const id = req.params.id
    const result = DB.findById(id)
    res.json(responses.success(result))
  },
  create: (req, res) => {
    const result = DB.create(req.body)
    res.json(responses.success(result, 'CREATED'))
  },
  update: (req, res) => {
    const id = req.params.id
    const result = DB.update(id, req.body)
    res.json(result ? responses.success(result, 'UPDATED') : responses.genericError('UPDATE_FAILD'))
  },
  delete: (req, res) => {
    const id = req.params.id
    const result = DB.delete(id)
    res.json(result ? responses.success(result, 'DELETED') : responses.genericError('DELETE_FAILD'))
  }
}

module.exports = Controller
