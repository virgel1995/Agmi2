
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
		},
		section : {
			type: mongoose.Schema.Types.ObjectId,
          ref: 'Section',
		}
	}
);
const Urls = mongoose.model("Url", UrlSchema)

module.exports = Urls