const express = require('express');
const minifyHTML = require('express-minify-html');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const { readDataFromJson } = require('./helpers/json/dataReader')
const experiences = readDataFromJson('./json/resume/experiences.json')
const projectsResume = readDataFromJson('./json/resume/projects.json')
const projectsIndex = readDataFromJson('./json/index/projects.json')

const profilePicture = readDataFromJson('./json/index/profile-picture.json')
const picture = readDataFromJson('./json/resume/picture.json')

const skills = readDataFromJson('./json/resume/skills.json')
const logo = readDataFromJson('./json/logo.json')
const heading = readDataFromJson('./json/index/heading.json')
const about = readDataFromJson('./json/index/about.json')
const works = readDataFromJson('./json/index/where-i-work.json')
const authorInfos = readDataFromJson('./json/author-infos.json')

const blogs = require('./json/blogs');

const app = express();
const fs = require('fs')

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
}));
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

dotenv.config();
const PORT = process.env['PORT'] || 8080;

app.get('/', function (_, res) {
  const sections = {
    profile_picture: profilePicture,
    logo,
    heading,
    about,
    projects: projectsIndex,
    blogs: Object.values(blogs),
    works,
    authorInfos

  }
  console.log(sections)
  res.render('pages/index', { sections });
});

app.get('/contact', function (_, res) {
  const sections = {
    logo,
    authorInfos,
    blogs: Object.values(blogs),

  }
  console.log(sections)
  res.render('pages/contact', { sections });
});

app.post('/form-sent', function (req, res) {

  console.log(req.body)
  const forms = require('./forms.json');

  const {firstname, lastname, phone, message} = req.body
  forms.push({firstname, lastname, phone, message})
  fs.writeFileSync("./forms.json", JSON.stringify(forms))
  res.json('ok')
});

app.get('/forms', function (req, res) {
  const sections = {
    logo,
    authorInfos,
    blogs: Object.values(blogs),
  }

  res.render('pages/forms', { sections });
});

app.post('/forms', function (req, res) {

  if (req.body.password && req.body.password === process.env['PASSWORD']) {
    res.json(require('./forms.json'))
  } else {
    res.status(400)
    res.json([])
  }
});

app.get('/resume', function (_, res) {
  const sections = {
    picture,
    experiences,
    projects: projectsResume,
    skills,
    logo,
    blogs: Object.values(blogs),
    authorInfos

  }
  console.log(sections)
  res.render('pages/resume', { sections });
});

app.get('/blog/:slug', function (req, res) {
  const {slug} = req.params
  if (!Object.values(blogs).find(b => b.slug === slug)) {
    res.status(404)
    res.send('NOT FOUND')
    return
  }
  const sections = {
    blog: blogs[slug],
    logo,
    selected_article: 'index' in req.query && req.query.index > -1 && req.query.index < blogs[slug].content.articles.length  ? +req.query.index : 0,
    blogs: Object.values(blogs),
    authorInfos
  }
  console.log( blogs[slug].content.articles)
  res.render('pages/blog', { sections });
});


app.listen(PORT, function() {
  console.log('url: http://localhost:'+PORT);
});