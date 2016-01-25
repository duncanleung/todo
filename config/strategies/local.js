var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

mondule.exports = function() {
    passport.use(new LocalStrategy(function(username, passpord, done) {
        User.findOne(
            {username: username},
            function(err, user) {
                if(err) {
                    return done(err);
                }

                if(!user) {
                    return done(null, false, { message: 'No user found' });
                }

                if(!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid password' });
                }

                return done(null ,user);
            }
        );
    }));
};
