var express = require('express');
var router = express.Router();

const User = require('../database/Schemas/User.js');
const Section = require('../database/Schemas/Sections.js');

/* GET home page. */
router.get('/', async function(req, res) {
const section = await Section.find({})
const urlCount = section.map((sec)=>{
	return sec.counter
})
	//console.log(urlCount)
		res.render('index', {
			title: 'Main Page',
			counter: urlCount,
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
const urlCount = section.map((sec)=>{
	return sec.counter
})
	//console.log(urlCount)
		res.render('index', {
			title: 'Main Page',
			counter: urlCount,
			session: req.session,
			sections: section
		})
	
	res.end();
});


module.exports = router;