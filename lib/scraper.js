const cheerio = require('cheerio')
const request = require('request')

const scrapeMovie = (id, res) => {
  let url = 'http://www.imdb.com/title/' + id + '/'
  console.log(url)
  request(url, (err, response, html) => {
    if (!err) {
      let $ = cheerio.load(html)
      let title, release, rating
      let data = {title: '', release: '', rating: ''}
      title = $('.title_wrapper h1').text()
      data.title = title
      release = $('.title_wrapper h1 span a').text()
      data.release = release
      rating = $('.ratingValue strong span').text()
      data.rating = rating
      console.log(data)
      res.json(data)
    }
  })
}

const scrapeTopMovies = (url, res) => {
  request(url, (err, response, html) => {
    if (!err) {
      let $ = cheerio.load(html)
      let title, release, rating
      let data = {title: '', release: '', rating: ''}
      let topMovies = []
      $('.lister-list tr').each((i, element) => {
        title = $(this).first().siblings().first().text()
        release = $(this).first().siblings().last().text()
        rating = $(this).first().next().next().first().text()
        data.title = title
        data.release = release
        data.rating = rating
        console.log(data)
        topMovies.push(data)
      })
      res.json(topMovies)
    }
  })
}

module.exports = {scrapeMovie, scrapeTopMovies}
