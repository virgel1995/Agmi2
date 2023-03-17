var express = require('express');
var router = express.Router();

const User = require('../database/Schemas/User.js');
const Section = require('../database/Schemas/Sections.js');

const { isAdmin } = require('../utils.js');

/* GET home page. */
router.get('/', async function(req, res) {
const section = await Section.find({})

		res.render('index', {
			title: 'Main Page',
			//user: user,
			session: req.session,
			sections: section
		})
	
	res.end();
});


router.get("/login", function(req, res, next) {
	res.render('login', { title: 'Login Page', session: req.session });
	res.end();
})

router.get('/home', async function(req, res) {
const section = await Section.find({})
//const user = await User.find(req.session.user._id)
		res.render('index', {
			title: 'Main Page',
			//user: user,
			session: req.session,
			sections: section
		})
	
	res.end();
});


module.exports = router;