const express = require('express')
const movie = require('./controllers/movieController')
const celeb = require('./controllers/celebController')
const routes = express.Router()

routes.get('/movie', movie.getMovie)
routes.get('/movie/genre', movie.getByGenre)
routes.get('/movie/release', movie.getByYear)
routes.get('/movie/rating', movie.getByRating)
routes.get('/movie/popular', movie.getByPopularity)
routes.get('/movie/director', movie.getByDirector)
routes.get('/celeb', celeb.getInfo)

module.exports = routes
