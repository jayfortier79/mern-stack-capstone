require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Connect to database
require('./config/database.cjs');

const app = express();

// Middleware
//  logger middleware to log requests
app.use(logger('dev'));
// middleware to parse incoming JSON data
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));

// checkToken Middleware. (Sets the req.user & req.exp properties on the request object)
app.use(require('./config/checkToken.cjs'));

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, headers');
  if ('OPTIONS' == req.method) {
  res.sendStatus(200);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, headers');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});




// Put API routes here, before the "catch all" route
app.get('/api/test', (req, res) => {
  res.send('You just hit a API route');
});

const userRouter = require('./routes/api/users.cjs');
//Router setup
// If the request starts with /api/users/ it directs the request to the userRouter (ln. 28)
app.use('/api/users', userRouter);

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// Send the built and compiled React code to the browser
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.options('/.*', (req, res) => {
  // Handle the OPTIONS request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, headers');
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});