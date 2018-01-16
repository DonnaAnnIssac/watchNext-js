const fs = require('fs')
const parser = require('./parser')
const folder = './../data/'

const populate = (fileArray) => {
  console.log(fileArray.length)
}

fs.readdir(folder, (err, files) => {
  if (err) console.error(err)
  files.forEach((file) => {
    parser(file, populate)
  })
})
