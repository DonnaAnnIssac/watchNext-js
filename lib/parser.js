const fs = require('fs')
const Transform = require('stream').Transform
const StringDecoder = require('string_decoder').StringDecoder

const startParser = (filename, callback) => {
  let parser = new Transform()
  let input = fs.createReadStream('../data/' + filename)
  input.pipe(parser)
  parser.on('data', (chunk) => {
    callback(JSON.parse(chunk))
  })
  parser._transform = function (data, encoding) {
    if (!this.myStringDecoder) this.myStringDecoder = new StringDecoder('utf8')
    let parsedResults = parseMovieInfo(this.myStringDecoder.write(data), filename)
    this.push(JSON.stringify(parsedResults))
  }
}

const parseSpace = data => {
  return (((/(\s)+/).test(data)) ? (data.replace(/(\s)+/, '')) : data)
}

const parseLines = (data) => {
  let dataArray = data.split('\n')
  dataArray.pop() // remove empty line at end
  return dataArray
}

const parseContents = (rows, keys) => {
  let dataArray = []
  rows.forEach((item) => {
    let itemObj = {}
    let itemArr = item.split('\t')
    itemArr = itemArr.map(data => parseSpace(data))
    keys.forEach((key, i) => { itemObj[key] = (itemArr[i] !== '\\N') ? itemArr[i] : null })
    dataArray.push(itemObj)
  })
  return dataArray
}

const parseMovieInfo = (data, filename) => {
  let rows = parseLines(data)
  let keys = rows.shift().split('\t')
  let dataObj = {}
  dataObj['filename'] = filename
  dataObj['contents'] = parseContents(rows, keys)
  return dataObj
}

module.exports = startParser
