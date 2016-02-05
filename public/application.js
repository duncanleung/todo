angular.module('todoApp', ['ngRoute', 'ngResource', 'main', 'users', 'todos'])

    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
      }
    ]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['todoApp']);
});