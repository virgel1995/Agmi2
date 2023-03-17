const router = require("express").Router();

const Section = require('../database/Schemas/Sections.js');
const Urls = require("../database/Schemas/Urls");
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
		res.status(200).send(section)
res.end()
	} catch (error) {
		console.log(error);
	}
});

router.post("/update/:id", async (req, res) => {
	try {
		const section = await Section.findById(req.params.id);
		if (section) {
			section.name = req.body.name
			await section.save();
			
			res.status(200).send(section)
		} else {
			res.status(404).json({
				message: "Sorry But section with this Id Not Found"
			});
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
	res.status(200).send(url)
	res.end()
})

router.post("/url/create", upload.single("image"), async (req, res) => {
	const data = req.body;
	console.log(data)
	try {

		const url = new Urls({
			title: data.title,
			email: data.email,
			password: data.password,
			section: data.sectionId,
			image: `/images/uploads/${req.file.originalname
				}`
		});
		await url.save();
		res.status(200).send(url)
		res.end();
	} catch (error) {
		console.log(error);
	}
});

router.post("/url/update/:id", async (req, res) => {
	try {
		const url = await url.findById(req.params.id);
		if (url) {

url.title = req.body.title
url.email = req.body.email
url.password = req.body.password

			await url.save();
		res.status(200).send(url)
		} else {
			res.status(404).json({
				message: "Sorry But Url with this Id Not Found"
			});
		}
		res.end()
	} catch (error) {
		console.log(error);
	}
});

module.exports = router