var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);
require("dotenv").config()
const cors =  require("cors")


var app = express();
const oneDay = 1000 * 60 * 60 * 24;

const listRoutes =  require("express-list-routes")
const intiMongoose = require("./database/mongo")
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localStorage');
}

var usersRouter = require('./routes/users');
var seedRouter = require('./routes/seed');
var mainRouter = require("./routes/index");
var sectionRouter = require("./routes/section");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(cors())
app.set('trust proxy', 1) // trust first proxy
//app.disable('trust proxy');
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
store: store, 
  secret: 'shhhh, very secret'
}));
//app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/seed', seedRouter);
app.use("/api/section", sectionRouter);
app.use("/", mainRouter);
//localStorage.setItem("test", "hello")
app.use(function(req, res, next) {
	req.session.test = "test"
req.session.user = ""
	console.log(req.session)

});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {
		
	};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});
// connection to database
intiMongoose();


listRoutes(app)
app.listen(3000, ()=>{
	console.log("sever up")
})
//module.exports = app;
