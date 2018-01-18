const express = require('express')
const movie = require('./controllers/movieController')
const routes = express.Router()

routes.get('/movie', movie.get)

module.exports = routes
