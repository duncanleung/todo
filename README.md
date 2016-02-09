# todo
**Live Demo:** [todo-mean.herokuapp.com](http://todo-mean.herokuapp.com/)

####Summary
ToDoIt is a full-stack MEAN (MongoDB, Express.js, Angular.js, Node.js) app that allows users to sign up for an account and store To Do items to their account.

TodoIt was built with a RESTful 'API first' process on Node.js, Express, and MongoDB. This approach provided helpful constraints to focus development on creating functional CRUD processes that could be tested using Postman. With functioning REST API endpoints, development could be focused on the frontend.

A normalized data structure with two separate MongoDB collections are used to store User accounts (with password hashing) and Todo items. Each To Do document stores a reference to the User ID that the To Do item belongs to. A MongoDB search on the Todo collection, by user ID, ensures that each user only sees To Dos they own.

Passport.js is used to authenticate users and create a session which is stored as a cookie, and Passport attaches `req.user` when a user is logged into a session. `req.user` is attached to the window object as `window.user` to allow Angular.js to conditionally show/hide elements, like a Logout link, if the user is logged in. 

API endpoints that require user authentication are also protected using a custom middleware that uses Passport's `req.isAuthenticated()` to either return `next()`, or returns a status code of 401.

On the frontend, a custom Angular.js factory service allows the Todo controller to make AJAX CRUD requests to the aformentioned API endpoints. TodoIt uses Angular's $routeProvider to serve partial html views according to defined URL routes, and ngRepeat is used to render To Do items. ngShow provides a simple method of conditionally showing/hiding UI elements depending on whether there are To Dos and completed To Do items.


####Built With the Following Technologies/Tools:
- MVC File Structure
- MongoDB (Mongoose)
- Node.js (Express)
- Angular.js
- Passport.js
- Bootstrap 3
- Sass
- EJS Templating Engine
- Gulp
- Postman

####Key Achievements
TodoIt was my third project for [Orange County Code School](https://www.orangecountycodeschool.com) and my key achievements for this project are: 
- RESTful server API endpoints built on Node.js, Express
- MongoDB stored todos and user-accounts with hashed passwords for security
- Username/Password login authentication and cookie session management with Passport.js
- Modularized AngularJS modules and controllers to separate functionality and improve code maintainability
- Reusable AngularJS service with $resource to CRUD todo items with backend API

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
- Start the server with `node server.js` (*Default: http://localhost:3000*)

![Todo Home Screen](http://www.duncanleung.com/portfolio/todo-github/todo-home.png)
![Todo Signup Screen](http://www.duncanleung.com/portfolio/todo-github/todo-signup.png)
![Todo Login Screen](http://www.duncanleung.com/portfolio/todo-github/todo-login.png)
![Todo List Screen](http://www.duncanleung.com/portfolio/todo-github/todo-list.png)
