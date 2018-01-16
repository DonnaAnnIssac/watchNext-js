const fs = require('fs')
const parser = require('./parser')
const folder = './../data/'
let next = 0
let filesArr = []
const populate = (contentsArray) => {
  next++
  callParser()
}

const callParser = () => {
  if (next < filesArr.length) parser(filesArr[next], populate)
}
fs.readdir(folder, (err, files) => {
  if (err) console.error(err)
  filesArr = files
  callParser()
})
