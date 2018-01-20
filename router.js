const express = require('express')
const movie = require('./controllers/movieController')
const routes = express.Router()

routes.get('/movie', movie.get)
routes.get('/genre', movie.getByGenre)

module.exports = routes
