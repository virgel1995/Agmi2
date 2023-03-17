
const Section = require('../database/Schemas/Sections.js');

const { upload } = require("../utils");

/**  Sections routes */

 const createSection =  async (req, res) => {

	try {
		const section = new Section({
			name: req.body.section
		});

		await section.save();
res.status(200).send(section)

} catch (error) {
		
		console.log(error);
	}
}

const createUrl =  async (req, res) => {

	const data = req.body;
try {
const section = await Section.findById(data.section);
    
		const url = {
			title: data.title,
			email: data.email,
			password: data.password,
			image: `/images/uploads/${req.file.originalname
				}`														} ;
section.urls.push(url)
await section.save();
	res.status(200).send(url)
	} catch (error) {

		console.log(error);
	}
}



module.exports = {
	createSection,
	createUrl
}