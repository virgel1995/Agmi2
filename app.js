var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);
require("dotenv").config()
const cors =  require("cors")

const { upload , isAdmin} = require("./utils");
 

var app = express();
const oneDay = 1000 * 60 * 60 * 24;

const listRoutes =  require("express-list-routes")
const intiMongoose = require("./database/mongo")
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});


var seedRouter = require('./routes/seed');
var mainRouter = require("./routes/index");
var section = require("./routes/section");
var userController = require("./routes/users");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.disable('trust proxy');
app.use(session({
  secret: process.env.SESSION_SECRET || "SOME_THING_secret",
  resave: true,
  saveUninitialized: false,
  store: store,
	coockie: {
		maxAge: oneDay
	}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


// section routes 
app.get("/section", section.getSections)
app.get("/url", section.getUrls)
app.post("/section/create", section.createSection) 
app.post("/url/create", upload.single("image"), section.createUrl)
app.delete("/url/delete/:id", section.deleteUrl)
app.put("/url/update", section.updateUrl)
//seeder route
app.use('/api/seed', seedRouter);

//user routes
app.get("/users", isAdmin, userController.allUsers)

app.get("/user/:id", userController.getUser)

app.post("/user/login", userController.login)
app.post("/user/create",userController.createUser)
app.post("/user/update/:id/:name/:email/: password", userController.updateUser)
app.delete("/user/delete/:id", userController.deleteUser)
app.post('/user/logout', userController.logout)


// main routes
app.use("/", mainRouter);

//handling errors
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {
	};
  // render the error page
  res.status(err.status || 500);
  res.render('error');

	const saveSession = (value) =>{
		req.session.user = value
	}
});
// connection to database
intiMongoose();
//list routes to console
listRoutes(app)
module.exports = app;

const getVlue =(value) =>{
	return value
}

