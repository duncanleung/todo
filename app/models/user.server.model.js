// Required in /app/config/mongoose.js

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;


// Set up User Schema
// ==============================
var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    index: true
  },
  username: {
    type: String,
    trim: true,
    unique: true
  },
  password: String,
  provider: String,
  providerId: String,
  providerData: {}
});

UserSchema.pre('save', function(next) {
var user = this;

  if(user.password) {
    bcrypt.hash(user.password, null, null, function(err, hash) {
      if(err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  }
});

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);