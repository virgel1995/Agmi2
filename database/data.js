const bcrypt = require('bcryptjs');

const data = {
	users: [
		{
			name: 'admin',
			email: "admin@admin.com",
			password: bcrypt.hashSync('admin'),
			isAdmin: true,
		},
	],
	sections: [
		{
			name: 'Main Section',
			//	counter: 1,
		},
	],
	counters: [
		{
			name: "count",
		},
	],
};
module.exports = data;