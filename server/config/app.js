var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let mongoose = require('mongoose');
let DB = require('./db');

/*
let compress = require('compression');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
*/
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let aboutRouter = require('../routes/aboutme');
let projectsRouter = require('../routes/projects');
let servicesRouter = require('../routes/services');
let contactRouter = require('../routes/contact');
let businessRouter = require('../routes/business.js');


let app = express();

/*
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));
*/
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aboutme',aboutRouter);
app.use('/projects',projectsRouter);
app.use('/services',servicesRouter);
app.use('/contact',contactRouter);

app.use('/business-list', businessRouter);
/*
// Sets up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inventory', inventoryRouter);
*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
