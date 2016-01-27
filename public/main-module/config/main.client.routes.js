angular.module('main').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'main/views/main.client.view.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);