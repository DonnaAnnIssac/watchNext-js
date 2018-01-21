const db = require('../db')
let celebController = {}

celebController.getInfo = (req, res) => {
  let value = '%' + req.query.name.toUppserCase() + '%'
  let query = 'select * from celebs where primary_name like $1'
  db.query(query, [value], (err, response) => {
    if (err) console.error(err)
    res.json(response.rows)
  })
}

module.exports = celebController
