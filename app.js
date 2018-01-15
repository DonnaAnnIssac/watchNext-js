const express = require('express')
// const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request')
const app = express()
const PORT = 9191

app.get('/', (req, res) => {
  let url = 'http://www.imdb.com/title/tt1229340/'
  request(url, (err, response, html) => {
    if (!err) {
      let $ = cheerio.load(html)
      let title, release, rating
      let json = {title: '', release: '', rating: ''}
      title = $('.title_wrapper h1').text()
      json.title = title
      release = $('.title_wrapper h1 span a').text()
      json.release = release
      rating = $('.ratingValue strong span').text()
      json.rating = rating
      console.log(json)
    }
  })
})

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
})
