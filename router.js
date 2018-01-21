const express = require('express')
const movie = require('./controllers/movieController')
const routes = express.Router()

routes.get('/movie', movie.get)
routes.get('/movie/genre', movie.getByGenre)
routes.get('/movie/release', movie.getByYear)
routes.get('/movie/rating', movie.getByRating)

module.exports = routes
