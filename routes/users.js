const express = require("express");
const User = require("../models/User");
const passport = require("passport")
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/register", (req, res, next) => {
	addUsertoDB(req, res);
});

async function addUsertoDB(req, res) {
	var user = new User({
		name: req.body.name,
		emailId: req.body.emailId,
		password: User.hashPassword(req.body.password),
	});

	User.findOne({ emailId: req.body.emailId }).then((user1) => {
		if (user1) {
			res.send({ userExists: true });
		} 
		else {
			user.save()
				.then((doc) => res.status(200).json(doc))
				.catch((err) => {
					console.log(err);
					res.status(500);
				});
		}
	});
}

//Login Handler
router.post('/login', (req, res, next) => {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return res.status(500).json(err); }
		if (!user) { return res.status(500).json(info); }
		req.logIn(user, function(err) {
		  if (err) { return res.status(500).json(err); }
		  return res.status(200).json({loginSuccess: true});
		});
	  })(req, res, next);
});

//To Verify user has logged in
router.get('/user', isValidUser, (req, res, next) => {
	return res.status(200).json(req.user);
});

//Logout
router.get('/logout', isValidUser, (req, res, next) => {
	req.logout();
	return res.status(200).json({message: 'Logged Out'});
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
