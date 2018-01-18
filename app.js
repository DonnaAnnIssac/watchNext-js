const express = require('express')
const pg = require('pg')
const config = require('./config')
const app = express()

let connString = 'pg://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name
let pgPool = new pg.Pool({
  connectionString: connString
})
pgPool.connect((err, client) => {
  if (err) console.log('Unable to connect: ' + err)
  app.use(express.static('public'))
})

app.listen(config.app.port, () => {
  console.log('Listening on port: ' + config.app.port)
})
