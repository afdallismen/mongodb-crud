const routes = require('express').Router()

routes.use('/books', require('./books.js'))

module.exports = routes