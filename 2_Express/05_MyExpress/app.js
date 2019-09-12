// These are modules that are installed from NPM and are imported into this file
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require("hbs");

// Create routes (or a file path) to the js files that will contain AJAX requests
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var leaguesRouter = require("./routes/leagues");
var teamsRouter = require("./routes/teams");

// Connect express to the APP
var app = express();

// View engine setup with handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect the handlebars partials to be used with views
hbs.registerPartials(__dirname + '/views/partials');

// Connect the URL with these routes when the user is directed there
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/leagues', leaguesRouter);
app.use('/teams', leaguesRouter);

// Error-handling middleware 
// Handle http 404 response
app.use((request, response, next) => {
  response.status(404).redirect('/404.html');
});

// Handle 500 response
app.use((request, response, next) => {
  response.status(500).redirect('/error.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;