// node server
// simple HTTP Server which reads data from a JSON file and returns in the response
var http = require('http');
var fs = require('fs');
var url = require('url');

//const connect = require("connect");
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

//const publicPath = '../client/';
//const dataPath = './data/';

// include routes
const leagues = require('./routes/leagues');
const teams = require('./routes/teams');

var app = express();

// register hbs partials
hbs.registerPartials(__dirname + '/views/partials');
// set view engine
app.set('view engine', 'hbs');

// partials
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// Middleware
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use routes
app.use('/leagues', leagues);
app.use('/teams', teams);

app.get('/index', (request, response) => {
    response.render('index.hbs', {pageTitle: 'Iron Chef'});
});

// Error-handling middleware 
// Handle http 404 response
app.use((request, response, next) => {
    response.status(404).redirect('/404.html');
});

// Handle 500 response
app.use((request, response, next) => {
    response.status(500).redirect('/error.html');
});

const port = 3000;
const server = http.createServer(app).listen(port);

server.on('listening', () => {
	console.log(`Server Listening on ${server.address().port}`);
});