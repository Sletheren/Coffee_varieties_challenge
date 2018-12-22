const express = require('express')
const router = express.Router()

/**
 * Our main route definition
 * We define the resources under /varieties to align with the norms of Restful APIs
 * We can add more here in the future and keep separation of concerns as much as possible
 */
const varieties = require('./varieties')

router.use(varieties('/varieties'))

module.exports = router
