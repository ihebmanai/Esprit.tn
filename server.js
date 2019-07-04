// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var cors = require('cors');



// var app = express();

// var mongoose = require('mongoose');
// const url ="mongodb://localhost:27017/esprit";
// mongoose.connect(url,{useNewUrlParser: true });
// mongoose.set()
// var mongo = mongoose.connection;

// mongo.on('connected', ()=>{
//   console.log('ouvrir / initialiser connexion');

// });

// mongo.on('open', ()=>{
//     console.log('connexion etablie');

// });

// mongo.on('error', (err)=>{
//     console.log(err);
// });



// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// router.use(logger('dev'));
// router.use('/uploads',express.static('uploads'))
// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));
// router.use(cookieParser());
// router.use(express.static(path.join(__dirname, 'public')));
// router.use(cors());


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

require('dotenv').config();


const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const socketIo = require("socket.io");

let app = express();
let server = require('http').createServer(app);

let mongoUrl = process.env.MONGO_CONNECTION_STRING;

mongoose.Promise = global.Promise;

mongoose
  .connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Local MongoDB');
  })
  .catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit();
  });
// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.set('port', process.env.SERVER_PORT || 4000);
// allow-cors
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride());
app.use(cookieParser());

// ******************* call all routes ***************************
app.use('/api', require('./routes'));

// error handling middleware should be loaded after loading the routes
app.use(errorHandler());

server.listen(app.get('port'), error => {
  if (error) {
    console.error(`\n${error}`);
    server.close();
    process.exit(1);
  }
  console.log(`Server Listening at http://localhost:${app.get('port')}/`);
});

