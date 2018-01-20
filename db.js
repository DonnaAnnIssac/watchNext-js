const config = require('./config')
const Pool = require('pg').Pool

const pgPool = new Pool({
  connectionString: 'pg://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name
})

module.exports = {
  query: (text, params, callback) => {
    return pgPool.query(text, params, callback)
  }
}
