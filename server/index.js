const express = require('express');
const app = express();

// route handler of express
app.get('/', (req, res) => {
    res.send({hi: 'there',
bye: 'there'})
});

// runtime environment parameters, Heroku will dynamically allocate a port number
// by setting the runtime PORT number 
// Or set it to port 5000 instead if we are in development setting - not deploying on Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);