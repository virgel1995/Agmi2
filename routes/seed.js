const express = require('express');
const data = require('../database/data.js');
const User = require('../database/Schemas/User.js');
const Section = require('../database/Schemas/Sections.js');


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {


	await Section.remove({});
	  const createSections = await Section.insertMany(data.sections);

  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
	
  res.send({ createdUsers , createSections });
});
module.exports =  seedRouter;