var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
	origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
	credentials: true
}));

mongoose.connect('mongodb://localhost:27017/LoginApplication')
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch(err => console.log(err));


//Passport middleware
app.use(session({
	name: 'myname.sid',
	resave: false,
	saveUninitialized: false,
	secret: 'mysecret',
	store: MongoStore.create({
		mongoUrl: 'mongodb://localhost:27017/LoginApplication',
		autoRemove: 'interval',
		autoRemoveInterval: 10,
		touchAfter: 24 * 3600
	}),
	cookie: {
		maxAge: 36000000,
		httpOnly: false,
		secure: false
	}
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
