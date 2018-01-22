const fs = require('fs')
const parser = require('./parser')
const populate = require('./populater')
let next = 0
let filesArr = []
let dataArr = []

const callNext = dataObj => {
  next++
  dataArr.push(dataObj)
  callParser()
}

const callParser = () => {
  if (next < filesArr.length) parser(filesArr[next], callNext)
  else populate(dataArr)
}

fs.readdir('../data', (err, files) => {
  if (err) console.error(err)
  filesArr = files
  callParser()
})
