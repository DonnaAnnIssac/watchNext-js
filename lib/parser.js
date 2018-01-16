const fs = require('fs')
const Transform = require('stream').Transform
const StringDecoder = require('string_decoder').StringDecoder
let parser = new Transform()

const startParser = (filename, callback) => {
  console.log('Filename: ' + filename)
  let input = fs.createReadStream('./../data/' + filename)
  input.pipe(parser)
  parser.on('data', (chunk) => {
    callback(JSON.parse(chunk))
  })
}

parser._transform = function (data, encoding) {
  if (!this.myStringDecoder) this.myStringDecoder = new StringDecoder('utf8')
  let parsedResults = parseLines(this.myStringDecoder.write(data))
  this.push(JSON.stringify(parsedResults))
}

const parseLines = (data) => {
  let dataArray = data.split('\n')
  dataArray.pop() // remove empty line at end
  return parseMovieInfo(dataArray)
}

const parseMovieInfo = (dataArray) => {
  let keysArray = dataArray.shift().split('\t')
  let infoObj = []
  dataArray.forEach((item) => {
    let itemObj = {}
    let itemArr = item.split('\t')
    keysArray.forEach((key, i) => {
      if (itemArr[i] !== '\\N') itemObj[key] = itemArr[i]
      else itemObj[key] = null
    })
    infoObj.push(itemObj)
  })
  return infoObj
}

module.exports = startParser
