
const mongoose = require("mongoose")



const counterSchema = new mongoose.Schema(
	{
     name: {
			 type: String,
			 default: "url"
		 },
	}
);

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
