const express = require('express');
const data = require('../database/data.js');
const User = require('../database/Schemas/User.js');
const Section = require('../database/Schemas/Sections.js');
const Counter = require('../database/Schemas/Counter.js');


const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {


	await Section.deleteMany({});
	  const createSections = await Section.insertMany(data.sections);

  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
	
	await Counter.deleteMany({});
 // const createdCounter = await Counter.insertMany(data.counters);
	
  res.send({ createdUsers , createSections });
});
module.exports =  seedRouter;