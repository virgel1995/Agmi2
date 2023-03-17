
const mongoose = require("mongoose")

  const UrlSchema = new mongoose.Schema(
  {
		title : {
			type: String,
			default: "Google"
		},
    image: { 
			type: String,
			default: " "
		},
    email: {
			type: String,
			default: "email@email.com"
 },
		password: {
			type: String,
			default: "password"
		}
	}
);


const sectionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			default:  "New Section"
					},
		urls: [UrlSchema]
	},
	{
		timestamps: true,
	}
	
);

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
