var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clubRouter = require('./routes/club');
var eventRouter = require('./routes/event');
var challengesRouter = require('./routes/challenges');
var unityRouter = require('./routes/unity');
var partRouter = require('./routes/parteneriat');
var pressRouter = require('./routes/press');
var specRouter = require('./routes/speciality');
var calRouter = require('./routes/calendrier');
var tarRouter = require('./routes/tarifs');
var infraRouter = require('./routes/infrastructure');
var actRouter = require('./routes/actualite');

var app = express();

var mongoose = require('mongoose');
const url ="mongodb://localhost:27017/esprit";
mongoose.connect(url,{useNewUrlParser: true });
mongoose.set()
var mongo = mongoose.connection;

mongo.on('connected', ()=>{
  console.log('ouvrir / initialiser connexion');

});

mongo.on('open', ()=>{
    console.log('connexion etablie');

});

mongo.on('eroor', (err)=>{
    console.log(err);

});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use('/uploads',express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/club', clubRouter);
app.use('/event', eventRouter);
app.use('/challenges', challengesRouter);
app.use('/unity', unityRouter);
app.use('/part', partRouter);
app.use('/press', pressRouter);
app.use('/speciality', specRouter);
app.use('/calendrier', calRouter);
app.use('/tarif', tarRouter);
app.use('/infrastructure', infraRouter);
app.use('/act', actRouter);


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