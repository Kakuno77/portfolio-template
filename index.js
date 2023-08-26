const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const { readDataFromJson } = require('./helpers/json/dataReader')
const experiences = readDataFromJson('./json/experiences.json')
const whoami = readDataFromJson('./json/whoami.json')
const projects = readDataFromJson('./json/projects.json')
const profilePicture = readDataFromJson('./json/profile-picture.json')
const skills = readDataFromJson('./json/skills.json')
const logo = readDataFromJson('./json/logo.json')

app.get('/', function (_, res) {
    const sections = {
        profile_picture: profilePicture,
        whoami,
        experiences,
        projects,
        skills,
        logo
    }
    console.log(sections)
    res.render('pages/index', { sections });
});

app.listen(8080, function() {
    console.log('url: http://localhost:8080');
});