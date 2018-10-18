const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//import routes
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

//create an express instance
var app = express();

//database config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose.
connect(db).
then(() => console.log('MongoDB connected')).
catch(err => console.log(err));

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


// for future deployment - use localhost port 5000 for development version
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
