const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let sessionSchema = new Schema(
	{
		"_id": {type: String, required: true},
		"expires": {type: Date, required: true},
		"lastModified": {type: Date, required: true},
		"session": {type: String, required: true}
	},
	{ collection: 'sessions'}
);

module.exports = mongoose.model('Session', sessionSchema);