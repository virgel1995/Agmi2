
const mongoose = require("mongoose")




const sectionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default:  "New Section"
					},
	},
	{
		timestamps: true,
	}
	
);

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
