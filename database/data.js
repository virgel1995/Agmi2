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
      url : {
				image : "microsoft.jpg",
				email : "email@hotmail.com",
				password: "123456"
			}
    },
  ],
		urls: [
    {
        title: 'Google',
				image : "microsoft.jpg",
				email : "email@hotmail.com",
				password: "123456",
			  section : 1
    },
  ],
};
module.exports =  data;