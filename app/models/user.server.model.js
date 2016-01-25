var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

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
  providerData: {},
  todos: {}
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
  };
});

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findUniqeUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne(
    { username: possibleUsername },
    function(err, user) {
      if(!err) {
        if(!user) {
          callback(possibleUsername);
        }
        else {
          return _this.findUniqeUsername(username, (suffix || 0) + 1);
        }
      }
      else {
        callback(null);
      }
    }
  );
};


module.exports = mongoose.model('User', UserSchema);
