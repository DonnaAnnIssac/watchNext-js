const pg = require('pg')
const config = require('./config')
let connObj
let filesArr = []
let connString = 'pg://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name

let pgPool = new pg.Pool({
  connectionString: connString
})

const init = (dataArr) => {
  filesArr = dataArr
  pgPool.connect((err, client) => {
    if (err) console.log('Unable to connect: ' + err)
    connObj = client
    beginInsert()
  })
}

const execQuery = (query, values) => {
  connObj.query(query, values, (err, res) => {
    if (err) console.error(err)
  })
}

const beginInsert = () => {
  populateMovies(filesArr.filter(file => file.filename === 'title.basics.tsv'))
}

const populateCrew = (dataObj) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO knownFor (nconst, tconst) VALUES ($1, $2)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'nconst' || keys[i] === 'primaryProfession') values.push(row[keys[i]])
    }
    execQuery(query, values)
  })
}

const populateRatings = (dataObj) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO knownFor (nconst, tconst) VALUES ($1, $2)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'nconst' || keys[i] === 'primaryProfession') values.push(row[keys[i]])
    }
    execQuery(query, values)
  })
  populateCrew(filesArr.filter(file => file.filename === 'title.crew.tsv'))
}

const populateKnownFor = (dataObj) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO knownFor (nconst, tconst) VALUES ($1, $2)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'nconst' || keys[i] === 'primaryProfession') values.push(row[keys[i]])
    }
    execQuery(query, values)
  })
  populateRatings(filesArr.filter(file => file.filename === 'title.ratings.tsv'))
}

const populateProfessions = (dataObj) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO professions (nconst, job_title) VALUES ($1, $2)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'nconst' || keys[i] === 'primaryProfession') values.push(row[keys[i]])
    }
    execQuery(query, values)
  })
  populateKnownFor(dataObj)
}

const populateCelebs = (dataObj) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO celebs (nconst, primary_name, birth_year, death_year) VALUES ($1, $2, $3, $4)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'primaryProfession' || keys[i] !== 'knownForTitles') values.push(row[keys[i]])
    }
    execQuery(query, values)
  })
  populateProfessions(dataObj)
}

const populateGenres = (dataObj) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO genres (tconst, genre) VALUES ($1, $2)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'genres') {
        if ((row[keys[i]].match(/,/g) || []).length !== 0) {
          let genres = row[keys[i]].split(',')
        }
      }
      if (keys[i] === 'tconst') values.push(row[keys[i]])
    }
    execQuery(query, values)
  })
  populateCelebs(filesArr.filter(file => file.filename === 'name.basics.tsv'))
}

const populateMovies = (dataObj) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO movies (tconst, title_type, primary_title, original_title, is_adult, start_year, end_year, runtime_mins) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'genres') values.push(row[keys[i]])
    }
    execQuery(query, values)
  })
  populateGenres(dataObj)
}

module.exports = init
