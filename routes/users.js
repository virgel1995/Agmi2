const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const User = require('../database/Schemas/User.js');
const { isAdmin } = require('../utils.js');


router.get(
	'/',
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const users = await User.find({});
		res.send(users);
	})
);

router.get(
	'/:id',
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id);
		if (user) {
			res.send(user);
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);

router.post(
	'/login',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
req.session.regenerate(function(){
  req.session.user = user;
	console.log(user)
	
		/*	res.json({
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAduser.isAdmin,
			})*/
	
       res.redirect('/home');
	req.session.user = user;
      });
			}
		} else {
			res.status(401).send({ message: 'Invalid email or password' });
			res.end()
		}
	})

);

router.post(
	'/create',
	expressAsyncHandler(async (req, res) => {
		try {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password),
			});
			await newUser.save();
			//req.sess.user = newUser;
		res.status(200).send(newUser)
		} catch (error) {
			console.log(error)
		}
		res.end();
	})
);
router.get('/logout', async function(req, res, next) {
	req.session.destroy(function(err) {
		console.log('Destroyed session')
	})
		res.status(200).json({
message: "successful logout"
		})
	res.end()
});

module.exports = router;
