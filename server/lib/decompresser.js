const zlib = require('zlib')
const gzip = zlib.createGunzip()
const fs = require('fs')

const decompressFile = (filename) => {
  let inputFile = 'compressedData/' + filename
  let outputFile = 'data/' + filename.slice(0, filename.length - 3)
  let input = fs.createReadStream(inputFile)
  let output = fs.createWriteStream(outputFile)
  input.pipe(gzip).pipe(output)
}

const folder = 'compressedData/'

const decompress = () => {
  fs.readdir(folder, (err, files) => {
    if (err) console.error(err)
    files.forEach((file) => {
      decompressFile(file)
    })
  })
}

module.exports = decompress
