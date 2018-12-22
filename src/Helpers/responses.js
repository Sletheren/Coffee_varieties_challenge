/**
 * Helper functions to normalize the responses we send to the end-user
 *
 * @param {String} message
 * @param {Object} data
 */

const success = (data, message) => ({
  status: 200,
  message: message || 'OK',
  data: data
})

const notFound = () => ({
  status: 404,
  message: 'NOT_FOUND'
})

const genericError = (message) => ({
  status: 400,
  message: message
})

const serverError = () => ({
  status: 500,
  message: 'SERVER_ERROR'
})

module.exports = {
  success,
  notFound,
  genericError,
  serverError
}
