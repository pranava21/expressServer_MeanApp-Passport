const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userInfoSchema = new Schema(
	{
		UserId: { type: String, required: true },
		UserName: { type: String, required: true },
		UserEmail: { type: String, required: true },
		UserBirthday: { type: Date, required: true },
		Organization: { type: String, required: true },
		ContactNo: { type: String, required: true },
	},
	{ collection: "UserInfo" }
);

module.exports = mongoose.model("UserInfo", userInfoSchema);
