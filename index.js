const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const { readDataFromJson } = require('./helpers/json/dataReader')
const experiences = readDataFromJson('./json/resume/experiences.json')
const whoami = readDataFromJson('./json/index/whoami.json')
const projects = readDataFromJson('./json/resume/projects.json')
const profilePicture = readDataFromJson('./json/resume/profile-picture.json')
const skills = readDataFromJson('./json/resume/skills.json')
const logo = readDataFromJson('./json/resume/logo.json')
const about = readDataFromJson('./json/index/about.json')

app.get('/', function (_, res) {
    const sections = {
        profile_picture: profilePicture,
        whoami,
        logo,
        about
    }
    console.log(sections)
    res.render('pages/index', { sections });
});

app.get('/resume', function (_, res) {
    const sections = {
        profile_picture: profilePicture,
        experiences,
        projects,
        skills,
        logo
    }
    console.log(sections)
    res.render('pages/resume', { sections });
});

app.listen(8080, function() {
    console.log('url: http://localhost:8080');
});