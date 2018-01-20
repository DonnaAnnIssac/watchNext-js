const db = require('../db')
let movieController = {}

movieController.get = (req, res) => {
  console.log(req.query.title)
  let value = '%' + req.query.title.toUpperCase() + '%'
  let query = 'SELECT * FROM movies where primary_title like $1;'
  db.query(query, [value], (err, response) => {
    if (err) console.error(err)
    console.log(response.rows)
    res.json(response.rows)
  })
}

movieController.getByGenre = (req, res) => {
  console.log(req.query.genre)
  let query = 'select * from movies where tconst in (select tconst from genres where genre = $1);'
  db.query(query, [req.query.genre], (err, response) => {
    if (err) console.error(err)
    console.log(response.rows)
    res.json(response.rows)
  })
}
module.exports = movieController
