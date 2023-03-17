const router = require("express").Router();

const Section = require('../database/Schemas/Sections.js');

const { upload } = require("../utils");

/**  Sections routes */
router.get("/", async (req, res) => {
	var section = await Section.find({})
	res.status(200).send(section)
})


router.post("/create", async (req, res) => {

	try {
		const section = new Section({
			name: req.body.section
		});

		await section.save();

			res.redirect("/home");
res.end()
	} catch (error) {
		
			res.redirect("back");
		console.log(error);
	}
});

router.post("/update/:id", async (req, res) => {
	try {
		const section = await Section.findById(req.params.id);
		if (section) {
			section.name = req.body.name
			await section.save();
			
			
			res.redirect("/home");
		} else {
			
			res.redirect("back");
		}
		res.end()
	} catch (error) {
		console.log(error);
	}
});





/**  Url routes  */
router.get("/url", async (req, res) => {
	
	var url = await Urls.find({})
	console.log(url)

res.redirect("/home");
	res.end()
})

router.post("/:id/url/update/:uid", async (req, res) => {
	try {
  const sectionId = req.params.id
	const urlId = req.params.uid
		
		const section = await Section.findById(sectionId).where(urls._id).equals(urlId);
		
		if (section) {

section.urls.title = req.body.title
section.urls.email = req.body.email
section.urls.password = req.body.password
			await section.save();

			res.redirect("/home");
		} else {

			res.redirect("back");
		}
		res.end()
	} catch (error) {
		
			res.redirect("back");
		console.log(error);
	}
});


//creat urls ---------+-----
router.post("/url/create", upload.single("image"), async (req, res) => {

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
			//res.redirect("/home");
		res.end();
	} catch (error) {
		//	res.redirect("back");
		console.log(error);
	}
});
/*
router.post("/url/create2", upload.single("image"), async (req, res) => {

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
			//res.redirect("/home");
		res.end();
	} catch (error) {
		//	res.redirect("back");
		console.log(error);
	}
});
*/




module.exports = router