
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const User = require('../database/Schemas/User.js');
const { isAdmin } = require('../utils.js');

module.exports = (app) =>{

app.get(
	'/api/user',
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const users = await User.find({});
		res.send(users);
	})
);

app.get(
	'/api/user/:id',
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.params.id);
		if (user) {
			res.redirect("/home");
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);

app.post(
	'/api/user/login',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
		req.session.user = user;
			if (bcrypt.compareSync(req.body.password, user.password)) {
req.session.regenerate(function(){

		/*	res.status(200).json({
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAduser.isAdmin,
			})*/
	
res.redirect('/home');
req.session.user = user
//console.log(req.session)
      });
			}
		} else {

			res.redirect("/login");
		}
		res.end()
	})

);

app.post(
	'/api/user/create',
	expressAsyncHandler(async (req, res) => {
		try {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password),
			});
			await newUser.save();
			/*
		res.status(200).json({
			user: newUser
		})*/
res.redirect("/home");

		} catch (error) {
			console.log(error)
			res.redirect("/login");
		}
		res.end();
	})
);
app.get('/api/user/logout', async function(req, res, next) {
	req.session.destroy(function(err) {
		console.log('Destroyed session')
	})
	
			res.redirect("/login");

	res.end()
});

}