
const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const createError = require('http-errors');



//import route
const users = require('./routes/api/users');
//const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

var app = express();


//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//DB config
const db = require('./config/keys').mongoURI;


// Connect to MongoDB
mongoose.
    connect(db).
    then(() => console.log('MongoDB connected')).
    catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config

require('./config/passport')(passport);




// Use routes
app.use('/users', users);
app.use('/profile', profile);
//app.use('/posts', posts);



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
