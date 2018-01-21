const db = require('../db')
let movieController = {}

movieController.get = (req, res) => {
  let value = '%' + req.query.title.toUpperCase() + '%'
  let q1 = 'select movies.tconst, movies.primary_title, movies.start_year, movies.runtime_mins, ratings.average_rating from movies'
  let q2 = ' inner join ratings on movies.tconst = ratings.tconst'
  let q3 = ' where primary_title like $1;'
  db.query(q1 + q2 + q3, [value], (err, response) => {
    if (err) console.error(err)
    res.json(response.rows)
  })
}

movieController.getByGenre = (req, res) => {
  let q1 = 'select movies.tconst, movies.primary_title, movies.start_year, movies.runtime_mins, ratings.average_rating from movies'
  let q2 = ' inner join ratings on movies.tconst = ratings.tconst'
  let q3 = ' where movies.tconst in (select tconst from genres where genre = $1);'
  db.query(q1 + q2 + q3, [req.query.genre], (err, response) => {
    if (err) console.error(err)
    res.json(response.rows)
  })
}

movieController.getByYear = (req, res) => {
  let q1 = 'select movies.tconst, movies.primary_title, movies.start_year, movies.runtime_mins, ratings.average_rating from movies'
  let q2 = ' inner join ratings on movies.tconst = ratings.tconst order by movies.start_year desc;'
  db.query(q1 + q2, (err, response) => {
    if (err) console.error(err)
    res.json(response.rows)
  })
}

movieController.getByRating = (req, res) => {
  let q1 = 'select movies.tconst, movies.primary_title, movies.start_year, movies.runtime_mins, ratings.average_rating from movies'
  let q2 = ' inner join ratings on movies.tconst = ratings.tconst order by ratings.average_rating desc;'
  db.query(q1 + q2, (err, response) => {
    if (err) console.error(err)
    res.json(response.rows)
  })
}

module.exports = movieController
