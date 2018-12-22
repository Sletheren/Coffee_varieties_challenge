/* Essential Packages */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

/* Specific Imports for our project */
const config = require('./config')
const responses = require('./Helpers/responses')
const routes = require('./Routes')

/* Defining our App */
const PORT = process.env.PORT || config.port
const app = express()

/* Attaching middlewares to our server */
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

/* Defining the root of our API routes */
app.use('/api', routes)

/* Handling 404 Errors */
app.use((req, res, next) => {
  return res.status(404).send(responses.notFound())
})

/* Handling Server or Unkown Errors */
app.use((err, req, res, next) => {
  /* Intercepting the errors from the validation of the request using the JOI's schemas */
  if (err.error && err.error.isJoi) {
    console.log(err.error)
    return res.status(400).send(responses.genericError('INVALID_REQUEST'))
  }
  console.log(err)
  return err.status === 500 ? res.status(500).send(responses.serverError()) : res.status(400).send(responses.genericError('FAILED'))
})

/* Listening on the PORT and starting magic */
app.listen(PORT, () => {
  console.log(`The Coffee machine is up and running on PORT: ${PORT}`)
})

/* Exported to be used for testing purposes */
module.exports = app
