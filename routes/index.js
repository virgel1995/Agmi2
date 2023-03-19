var express = require('express');
var router = express.Router();

const User = require('../database/Schemas/User.js');
const Section = require('../database/Schemas/Sections.js');
const Counter = require('../database/Schemas/Counter.js');
/* GET home page. */
router.get('/', async function(req, res) {
const section = await Section.find({})
	const urlCount = await Counter.find({}).count()

const user = await User.find({})
		res.render('index', {
			title: 'Main Page',
			counter: urlCount,
			user: user,
			session: req.session,
			sections: section
		})
	
	res.end();
});


router.get("/login", function(req, res, next) {
	
	console.log(req.cookies)
	res.render('login', { title: 'Login Page', session: req.session });
	res.end();
})

router.get('/home', async function(req, res) {
const section = await Section.find({})
	const urlCount = await Counter.find({}).count();

const user = await User.find({})
console.log(user)
		res.render('index', {
			title: 'Main Page',
			counter: urlCount,
			user: user,
			session: req.session,
			sections: section
		})
	
	res.end();
});

module.exports = router;