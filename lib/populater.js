const insertIntoDb = (dataArr, cb) => {
  dataArr.forEach(dataObj => {
    if (dataObj.filename === 'title.basics.tsv') populateMovies(dataObj, cb)
    else if (dataObj.filename === 'name.basics.tsv') populateCelebs(dataObj, cb)
  })
}

const populateGenres = (dataObj, cb) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO genres (tconst, genre) VALUES ($1, $2)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'tconst' || keys[i] === 'genres') values.push(row[keys[i]])
    }
    cb(query, values)
  })
}

const populateMovies = (dataObj, cb) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO movies (tconst, title_type, primary_title, original_title, is_adult, start_year, end_year, runtime_mins) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'genres') values.push(row[keys[i]])
    }
    cb(query, values)
  })
  populateGenres(dataObj, cb)
}

const populateProfessions = (dataObj, cb) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO professions (nconst, job_title) VALUES ($1, $2)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'nconst' || keys[i] === 'primaryProfession') values.push(row[keys[i]])
    }
    cb(query, values)
  })
}

// const populateKnownFor = (dataObj, cb) => {
//   dataObj.contents.forEach((row) => {
//     let query = 'INSERT INTO knownFor (nconst, tconst) VALUES ($1, $2)'
//     let keys = Object.keys(row)
//     let values = []
//     for (let i = 0; i < keys.length; i++) {
//       if (keys[i] === 'nconst' || keys[i] === 'primaryProfession') values.push(row[keys[i]])
//     }
//     cb(query, values)
//   })
// }

const populateCelebs = (dataObj, cb) => {
  dataObj.contents.forEach((row) => {
    let query = 'INSERT INTO celebs (nconst, primary_name, birth_year, death_year) VALUES ($1, $2, $3, $4)'
    let keys = Object.keys(row)
    let values = []
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'primaryProfession' || keys[i] !== 'knownForTitles') values.push(row[keys[i]])
    }
    cb(query, values)
  })
  populateProfessions(dataObj, cb)
//   populateKnownFor(dataObj, cb)
}

module.exports = insertIntoDb
