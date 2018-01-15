const express = require('express')
const url = require('url')
const app = express()
const scraper = require('./lib/scraper')
const PORT = 9191

app.use(express.static('public'))

app.get('/movie', (req, res) => {
  scraper.scrapeMovie(url.parse(req.url, true).query.id, res)
})

app.get('/top', (req, res) => {
  let url = 'http://www.imdb.com/chart/top?ref_=nv_mv_250_6'
  scraper.scrapeTopMovies(url, res)
})
app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
})
