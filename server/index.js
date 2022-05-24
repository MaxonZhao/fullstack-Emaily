const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();


// these are called middleaware layer - some small functions that 
// will do some pre-processing of the incoming requests before they are sent off to different route handlers
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // last for 30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize())
app.use(passport.session());

require('./routes/authRoutes')(app);




// runtime environment parameters, Heroku will dynamically allocate a port number
// by setting the runtime PORT number 
// Or set it to port 5000 instead if we are in development setting - not deploying on Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);