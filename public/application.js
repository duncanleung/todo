angular.module('todoApp', ['ngRoute', 'ngResource', 'main', 'users', 'todos'])

    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.hashPrefix('!');
      }
    ]);

// Facebook OAuth URL Fix
if(window.location.hash === '#_=_') {
  window.location.hash = '#!';
}

angular.element(document).ready(function() {
  angular.bootstrap(document, ['todoApp']);
});