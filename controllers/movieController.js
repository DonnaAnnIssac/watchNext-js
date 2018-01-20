const db = require('../db')
let movieController = {}

movieController.get = (req, res) => {
  let value = '%' + req.query.title.toUpperCase() + '%'
  let query = 'SELECT * FROM movies where primary_title like $1;'
  db.query(query, [value], (err, response) => {
    if (err) console.error(err)
    res.json(response.rows)
  })
}

movieController.getByGenre = (req, res) => {
  let query = 'select * from movies where tconst in (select tconst from genres where genre = $1);'
  db.query(query, [req.query.genre], (err, response) => {
    if (err) console.error(err)
    res.json(response.rows)
  })
}

movieController.getByYear = (req, res) => {
  let query = 'select * from movies order by start_year desc;'
  db.query(query, (err, response) => {
    if (err) console.error(err)
    res.json(response.rows)
  })
}
module.exports = movieController
