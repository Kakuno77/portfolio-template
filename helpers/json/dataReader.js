const fs = require('fs')

module.exports.readDataFromJson = (filepath) => {
  return JSON.parse(fs.readFileSync(filepath, 'utf8'))
}