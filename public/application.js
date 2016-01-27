var app = angular.module('todo', ['ngRoute', 'main', 'users']);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);

if(window.location.hash === '#_=_') {
  window.location.hash = '#!';
}

angular.element(document).ready(function() {
  angular.bootstrap(document, ['todo']);
});