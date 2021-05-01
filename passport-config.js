var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require('./models/User');
passport.use('local', new LocalStrategy(
	{
		usernameField: "emailId",
		passwordField: "password"
	},
  function(username, password, done) {
    User.findOne({ emailId: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { emailError: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { passwordError: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
