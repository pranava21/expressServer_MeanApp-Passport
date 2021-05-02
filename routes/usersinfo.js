const express = require("express");
const UserInfo = require("../models/UserInfo");
const Session = require("../models/Session");
const User = require("../models/User");
const passport = require("passport");
const { ObjectId } = require("bson");

var router = express.Router();

router.post('/getUserInfo', isValidUser, function(req, res, next) {
	console.log(req.body.userEmail);
	UserInfo.findOne({UserId: req.body.id})
		.then(userInfo => {
			if(userInfo){
				res.status(200).json(userInfo);
			}
			else{
				res.status(404).json({message: 'User not found'});
			}
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Unknown Error'});
		});
});

router.get('/getuserid', (req, res, next) => {
	Session.findById("tJzxzv5RGP-IIXQU6hEvD0dUaYh19t21")
	.then(uid => {
		let session = JSON.parse(uid.session)
		if(uid){
			res.status(200).json(session.passport);
		}
	}).
	catch(err => console.error(err));
})

function isValidUser(req, res, next){
	if(req.isAuthenticated()){
		next();
	}
	else{
		return res.status(401).json({message: 'Unauthoried User'});
	}
}

module.exports = router;