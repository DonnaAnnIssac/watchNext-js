const express = require('express')
const pg = require('pg')
const app = express()
const config = require('./config')
const helper = require('./lib/helper')
const populater = require('./lib/populater')
let connObj

let connString = 'pg://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name
let pgPool = new pg.Pool({
  connectionString: connString
})
pgPool.connect((err, client) => {
  if (err) console.log('Unable to connect: ' + err)
  app.use(express.static('public'))
  connObj = client
  helper(populater, execQuery)
})

const execQuery = (query, values) => {
  connObj.query(query, values, (err, res) => {
    if (err) console.error(err)
    else console.log(res.rows.length)
  })
}
app.listen(config.app.port, () => {
  console.log('Listening on port: ' + config.app.port)
})
