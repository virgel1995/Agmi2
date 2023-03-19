var path = require('path');
const Section = require('../database/Schemas/Sections.js');
const Counter = require("../database/Schemas/Counter");

const fs = require('fs');

// delete url 
const deleteUrl = async (req, res) =>{
try {
	var sectionId = req.params.id;
var urlToRemove = req.body.title
	var ImageToDelete = req.body.image
const section = await Section.findOne({ _id: sectionId })
	
fs.unlink(path.join(__dirname , "../", "public") + ImageToDelete, (err) => {
    if (err) {
        throw err;
    }
    console.log("Delete File successfully.");
});
section.urls.pull({ title: urlToRemove });
	await Counter.deleteOne({ name:  urlToRemove }).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});

await section.save();
	res.status(200).json({
message: "Successfully deleted url",
	urls: section.urls
})
} catch (error) {
	res.status(400).json({
		message: "undefined url or section"
	})
}
}
// updateUrl 
const updateUrl = async (req, res) =>{
try {
	let urlImage;
  
	var sectionId = req.body.section;
	var urlId = req.body.urlId
  var urlTitle = req.body.title
	var urlEmail = req.body.email
	var urlPassword = req.body.password
	if (req.file) {
   urlImage = req.body.image
  }

	Section.findOneAndUpdate(
  {_id: sectionId},
		      {'$set': {
      'urls.$[el].title': urlTitle,
      'urls.$[el].email': urlEmail,
			'urls.$[el].password': urlPassword,

	   }},
  { 
    arrayFilters: [{ 
			"el.title": urlTitle,
			"el.email": urlEmail,
			"el.password": urlPassword,
									 }],
    new: true
  }
)
	/*
await Section.update({'urls._id': urlId},
      {'$set': {
      'urls.$.title': urlTitle,
      'urls.$.email': urlEmail,
			'urls.$.password': urlPassword,

	   }});*/

//await Section.save();
	res.status(200).json({
message: "Successfully deleted url"
})
} catch (error) {
	res.status(400).json({
		message: "undefined url or section"
	})
}
}

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

const updateSection = async (req, res) =>{
try {
	
	const section =  await Section.findById(req.params.id);
if (section){
section.name = req.body.name
await section.save();
	
res.status(200).json({
	message: "Successfully Update Section",
				_id: section._id,
				name: section.name
			});
} else {
	res.status(404).json({
		message: "Sorry But section with this Id Not Found"
	});
}
	res.end()
} catch (error) {
	console.log(error);
}
}

module.exports = {
	createSection,
	createUrl,
	getUrls,
	getSections,
	updateSection,
	
	updateUrl,
	deleteUrl
}