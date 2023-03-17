
const bcrypt = require('bcryptjs');

const User = require('../database/Schemas/User.js');
const { isAdmin } = require('../utils.js');


const allUsers = async (req, res) => {
		const users = await User.find({});
		res.json({
			message:"All Users Data ",
			users: users
		});
}

	
const getUser = async (req, res) => {
		const user = await User.findById(req.params.id);
		if (user) {
res.status(200).json({
	message: "Ooh We Have This User Data",
	user: user
})
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
}

	
const login = async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
		req.session.user = user;
			if (bcrypt.compareSync(req.body.password, user.password)) {
req.session.regenerate(function(){

			res.status(200).json({
				message: "Successfully Loged In",
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAduser.isAdmin,
			})
	
req.session.user = user
      });
			}
		} else {
res.status(404).json({
	message: "Sorry But Put Invalid Data"
})
			//res.redirect("/login");
		}
}

const createUser = async (req, res) => {
		try {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password),
			});
			await newUser.save();
			
		res.status(200).json({
      message: "Successfully Created New User", 
			user: newUser
		})
		} catch (error) {
			res.status(400).json({
				message: 'Invalied Data Please Make Sure You Have Set Secure Data'
			})
			console.log(error)
		}

}
	

	const logout = async function(req, res, next) {
	req.session.destroy(function(err) {
		console.log('Destroyed session')
	})
	
			res.redirect("/login");

	}

module.exports = {
  allUsers,
	getUser,
	login,
	createUser,
	logout
}