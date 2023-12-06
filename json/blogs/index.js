const fs = require('fs')
const { readDataFromJson } = require('../../helpers/json/dataReader')

 function parseFolder(path) {
  let blogs = []
  for (const file of fs.readdirSync(path)) {
    const lstatFolder = fs.lstatSync(path + '/' + file);
    if (lstatFolder.isDirectory()) {
      blogs =  {...blogs, ...parseFolder(path + '/' +  file)}
    }
    if ( !lstatFolder.isFile() || file.split('.').slice(-1)[0].toLowerCase() !== 'json')
      continue;
    //const filename = file.split('.')[0]
    const json = readDataFromJson(path + '/' + file)
    blogs[json.slug] = json
  }
  return blogs
}




module.exports = {
  ...parseFolder('./json/blogs')
}