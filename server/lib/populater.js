const pg = require('pg')
const config = require('../config')
let connObj
let counter = 0
let filesArr = []

let connString = 'pg://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name

let pgPool = new pg.Pool({
  connectionString: connString
})

const execQuery = (query, values, rows) => {
  if (values === null) {
    connObj.query(query, (err, res) => {
      if (err) console.log('Error with ' + query + values + err)
      counter++
      if (counter === rows) insert()
    })
  } else {
    connObj.query(query, values, (err, res) => {
      if (err) console.log('Error with ' + query + values + err)
      counter++
      if (counter === rows) insert()
    })
  }
}

const populateWriters = () => {
  console.log('Into Writers...')
  let dataObj = filesArr.filter(file => file.filename === 'title.crew.tsv')[0]
  dataObj.contents.forEach(row => {
    let query = 'INSERT INTO writers (tconst, nconst) VALUES ($1, $2)'
    let count = (row['writers'] !== null) ? (row['writers'].match(/,/g) || []).length + 1 : 1
    let writers = (count !== 1) ? row['writers'].split(',') : row['writers']
    while (count !== 0) {
      let values = []
      values.push(row['tconst'])
      if (Array.isArray(writers)) {
        values.push(writers[0])
        writers.shift()
      } else values.push(writers)
      execQuery(query, values, dataObj.contents.length)
      count--
    }
  })
}

const populateDirectors = () => {
  console.log('Into Directors...')
  let dataObj = filesArr.filter(file => file.filename === 'title.crew.tsv')[0]
  dataObj.contents.forEach(row => {
    let query = 'INSERT INTO directors (tconst, nconst) VALUES ($1, $2)'
    let count = (row['directors']) ? (row['directors'].match(/,/g) || []).length + 1 : 1
    let directors = (count !== 1) ? row['directors'].split(',') : row['directors']
    while (count !== 0) {
      let values = []
      values.push(row['tconst'])
      if (Array.isArray(directors)) {
        values.push(directors[0])
        directors.shift()
      } else values.push(directors)
      execQuery(query, values, dataObj.contents.length)
      count--
    }
  })
}

const populateKnownFor = () => {
  console.log('Into KnownFor...')
  let dataObj = filesArr.filter(file => file.filename === 'name.basics.tsv')[0]
  dataObj.contents.forEach(row => {
    let query = 'INSERT INTO knownFor (nconst, tconst) VALUES ($1, $2)'
    let count = (row['knownForTitles'] !== null) ? (row['knownForTitles'].match(/,/g) || []).length + 1 : 1
    let titles = (count !== 1) ? row['knownForTitles'].split(',') : row['knownForTitles']
    while (count !== 0) {
      let values = []
      values.push(row['nconst'])
      if (Array.isArray(titles)) {
        values.push(titles[0])
        titles.shift()
      } else values.push(titles)
      execQuery(query, values, dataObj.contents.length)
      count--
    }
  })
}

const populateProfessions = () => {
  console.log('Into Professions...')
  let dataObj = filesArr.filter(file => file.filename === 'name.basics.tsv')[0]
  dataObj.contents.forEach(row => {
    let query = 'INSERT INTO professions (nconst, job_title) VALUES ($1, $2)'
    let count = (row['primaryProfession'] !== null) ? (row['primaryProfession'].match(/,/g) || []).length + 1 : 1
    let titles = (count !== 1) ? row['primaryProfession'].split(',') : row['primaryProfession']
    while (count !== 0) {
      let values = []
      values.push(row['nconst'])
      if (Array.isArray(titles)) {
        values.push(titles[0])
        titles.shift()
      } else values.push(titles)
      execQuery(query, values, dataObj.contents.length)
      count--
    }
  })
}

const populateCelebs = () => {
  console.log('Into Celebs...')
  let dataObj = filesArr.filter(file => file.filename === 'name.basics.tsv')[0]
  dataObj.contents.forEach(row => {
    let query = 'INSERT INTO celebs (nconst, primary_name, birth_year, death_year) VALUES ($1, $2, $3, $4)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'primaryProfession' && keys[i] !== 'knownForTitles') values.push(row[keys[i]])
    }
    execQuery(query, values, dataObj.contents.length)
  })
}

const populateRatings = () => {
  console.log('Into Ratings...')
  let dataObj = filesArr.filter(file => file.filename === 'title.ratings.tsv')[0]
  dataObj.contents.forEach(row => {
    let query = 'INSERT INTO ratings (tconst, average_rating, num_votes) VALUES ($1, $2, $3)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) values.push(row[keys[i]])
    execQuery(query, values, dataObj.contents.length)
  })
}

const populateGenres = () => {
  console.log('Into Genres...')
  let dataObj = filesArr.filter(file => file.filename === 'title.basics.tsv')[0]
  dataObj.contents.forEach(row => {
    let query = 'INSERT INTO genres (tconst, genre) VALUES ($1, $2)'
    let count = (row['genres'] !== null) ? (row['genres'].match(/,/g) || []).length + 1 : 1
    let genres = (count > 1) ? row['genres'].split(',') : row['genres']
    while (count !== 0) {
      let values = []
      values.push(row['tconst'])
      if (Array.isArray(genres)) {
        values.push(genres[0])
        genres.shift()
      } else values.push(genres)
      execQuery(query, values, dataObj.contents.length)
      count--
    }
  })
}

const populateMovies = () => {
  console.log('Into Movies...')
  let dataObj = filesArr.filter(file => file.filename === 'title.basics.tsv')[0]
  dataObj.contents.forEach(row => {
    let query = 'INSERT INTO movies (tconst, title_type, primary_title, original_title, is_adult, start_year, end_year, runtime_mins) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'genres') values.push(row[keys[i]])
    }
    execQuery(query, values, dataObj.contents.length)
  })
}

const init = (dataArr) => {
  filesArr = dataArr
  pgPool.connect((err, client) => {
    if (err) console.log('Unable to connect: ' + err)
    connObj = client
    insert()
  })
}

let files = [populateMovies, populateGenres, populateRatings, populateCelebs]

const insert = () => {
  console.log('Inserting...')
  counter = 0
  if (files.length !== 0) {
    let populator = files.shift()
    populator()
  }
}

module.exports = init
