var express = require('express');
var router = express.Router();

const User = require('../database/Schemas/User.js');
const Section = require('../database/Schemas/Sections.js');
const Counter = require('../database/Schemas/Counter.js');
/* GET home page. */
router.get('/', async function(req, res) {
const section = await Section.find({})
	const urlCount = await Counter.find({}).count()


	//console.log(urlCount)
		res.render('index', {
			title: 'Main Page',
			counter: urlCount,
			session: req.session,
			sections: section,
		})
	
	res.end();
});


router.get("/login", function(req, res, next) {
	res.render('login', { title: 'Login Page', session: req.session });
	res.end();
})

router.get('/home', async function(req, res) {
const section = await Section.find({})
	const urlCount = await Counter.find({}).count();


	//console.log(urlCount)
		res.render('index', {
			title: 'Main Page',
			counter: urlCount,
			session: req.session,
			sections: section
		})
	
	res.end();
});

router.get(
  '/search', async (req, res) => {
    const { query } = req;
		

    const search = query.query || '';


    const section = await Section.find()

    res.send({
      section,
    });
	});

module.exports = router;