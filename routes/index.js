var express = require('express');
var router = express.Router();

const User = require('../database/Schemas/User.js');
const Section = require('../database/Schemas/Sections.js');
const Urls = require("../database/Schemas/Urls");

const { isAdmin } = require('../utils.js');

/* GET home page. */
router.get('/home', async function(req, res) {
	//res.render("index")

const url = await Urls.find({})
const section = await Section.find({})
		res.render('index', {
			title: 'Main Page',
			//user: user,
			session: req.session,
			urls: url,
			sections: section
		})
	
	res.end();
});


router.get("/", function(req, res, next) {
	res.render('login', { title: 'Login Page', session: req.session });
	res.end();
})




module.exports = router;