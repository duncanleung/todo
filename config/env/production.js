// Required in /app/config/config.js
// Express app environment config for production

var port = process.env.PORT || 5000;

module.exports = {
  port: port,
  db: 'mongodb://leungd-db:3GW8VstttJGVM@ds059165.mongolab.com:59165/todoit-app'
};