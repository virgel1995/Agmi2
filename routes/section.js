
const Section = require('../database/Schemas/Sections.js');
const Counter = require("../database/Schemas/Counter")
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
	
	const count = new Counter({
		    name: data.title
	});

await count.save();

section.urls.push(url)
await section.save();

	res.status(200).send(url)
	} catch (error) {

		console.log(error);
	}
}

const getUrls = async (req, res) => {
	//let url;
	var section = await Section.find({}).select('urls')
	//console.log(section.length)
	

//	console.log(url)
res.status(200).json({
	message: "All Urls",
	//urls: url
})
}

const getSections =  async (req, res) => {
	var section = await Section.find({})
	res.status(200).send(section)
}

module.exports = {
	createSection,
	createUrl,
	getUrls,
	getSections
}