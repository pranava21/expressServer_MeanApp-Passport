const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

let userSchema = new Schema(
	{
		name: {type: String, require: true},
		emailId: {type: String, require: true},
		password: {type: String, require: true},
		createOn: {type: Date, default: Date.now}
	},
	{ collection: "Users"}
);

userSchema.statics.hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
}

userSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User', userSchema);