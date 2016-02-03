// Required in /app/config/passport.js

var passport = require('passport'),
  url = require('url'),
  FacebookStrategy = require('passport-facebook').Strategy,
  config = require('../config');

var User = require('../../app/models/user.server.model.js');
/*var users = require('../../app/controllers/users.server.controller');*/

var saveOAuthUserProfile = function(req, profile, done) {
  User.findOne({
      provider: profile.provider,
      providerId: profile.providerId
    },
    function(err, user) {
      if (err) {
        return done(err);
      }
      else {
        if (!user) {
          var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
          
          User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
            profile.username = availableUsername;
            user = new User(profile);

            user.save(function(err) {
              if (err) {
                var message = _this.getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
              }

              return done(err, user);
            });
          });
        }
        else {
          return done(err, user);
        }
      }
    }
  );
};

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'emails', 'name', 'displayName'],
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    var providerUserProfile = {
      name: profile.name.givenName,
      email: profile.emails[0].value,
      username: profile.username,
      provider: 'facebook',
      providerId: profile.id,
      providerData: providerData
    };

    User.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};