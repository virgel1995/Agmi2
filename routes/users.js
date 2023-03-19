
const bcrypt = require('bcryptjs');

const User = require('../database/Schemas/User.js');

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
	//console.log(user)
		if (user) {
		req.session.user = user;
			if (bcrypt.compareSync(req.body.password, user.password)) {
//req.session.regenerate(function(){
	//	req.session.userData = user
			//res.redirect("/");
     // });

				
			res.status(200).json({
				message: "Successfully Loged In",
				user: user
			})
				
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
	const updateUser = async (req, res) =>{
		const data = req.params;
		
 try {
 	  const user = await User.findOneAndUpdate({
		 _id: data.id
	 }, {
			name: data.name,
			email: data.email,
			password: bcrypt.hashSync(String(req.body.password))
	 });

			res.status(200).json({
				message: "success update",
				user : user
			})
console.log(user)
		
 } catch (err) {
 	console.log(err)
res.status(400).send(err)
 }
	}

const deleteUser = async (req,res) =>{
	const userId = req.params.id
try {
 await User.findOneAndDelete({
		 _id: userId
	 });
console.log("deleted user")

res.status(200).send("user deleted successful")
} catch (error) {
	console.log(error)
res.status(400).send(err)
}

}

	const logout = async(req, res, next) => {
		console.log('Destroyed session')
res.status(200).json({
	message: "Successfully Loged out"
})
		
	}

module.exports = {
  allUsers,
	getUser,
	login,
	createUser,
  updateUser,
  deleteUser,
	logout
}