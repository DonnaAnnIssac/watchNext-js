const fs = require('fs')
const parser = require('./parser')
const folder = 'data'
let next = 0
let filesArr = []
let dataArr = []
let callback, helper

const callNext = dataObj => {
  next++
  dataArr.push(dataObj)
  callParser()
}

const callParser = () => {
  if (next < filesArr.length) parser(filesArr[next], callNext)
  else callback(dataArr, helper)
}

const init = (cb, cb2) => {
  callback = cb
  helper = cb2
  fs.readdir(folder, (err, files) => {
    if (err) console.error(err)
    filesArr = files
    callParser()
  })
}

module.exports = init
