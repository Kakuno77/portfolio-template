const fs = require('fs')
const { readDataFromJson } = require('../../helpers/json/dataReader')

let blogs = []
let index = 1;
for (const file of fs.readdirSync('./json/blogs').filter(path => path.split('.').slice(-1)[0].toLowerCase() === 'json')) { 
  const filename = file.split('.')[0]
  const json = readDataFromJson('./json/blogs/' + file)
  blogs[json.slug] = json
  index++
}

console.log(blogs)
module.exports = {
    ...blogs
}