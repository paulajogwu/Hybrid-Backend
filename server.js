var express = require("express");
var Sequelize = require("sequelize");
var session = require("express-session");
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')


var path = require('path');
const cors = require('cors');
// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);

var app = express()
// create database, ensure 'postgres' in your package.json
const sequelize = new Sequelize('Hybrid','postgres','123',{
  host:'localhost',
  dialect:'postgres',
});

var sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 10000,
  expiration: 7 * 24 * 60 * 60 * 10000
});

sessionStore.sync()
app.use(session({
  secret: 'keyboard cat',
  resave: false, saveUninitialized: false,
  store: sessionStore
}));
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./database');

const routeAuth = require('./routes/authRouter');
const routeBuyer = require('./routes/buyerRouter');
const routeseller = require('./routes/sellerRouter');


app.use('/api/v1/auth', routeAuth);
app.use('/api/v1/buyer', routeBuyer);
app.use('/api/v1/seller', routeseller);




app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next()
})


app.use(function (req, res) {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})
// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at  http://localhost:' + port)
})

module.exports = app