# todo
An Angular ToDo Web App with User Authentication

##To Run an Instance of this App
*(Currently in Development!)*

- Create `config/env/development.js`

```
var port = 3000;

module.exports = {
  port: port,
  db: 'mongodb://localhost/todoapp',
  facebook: {
    clientID: 'YOUR APP ID',
    clientSecret: 'YOUR APP SECRET',
    callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
  }
};
```

- Run `bower install` to install frontend dependencies

- Run `npm install` to install backend dependencies

- Start the server with node server.js (*Default: http://localhost:3000*)