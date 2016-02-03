angular.module('main', [])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'main-module/views/main.client.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
])

.controller('MainController', ['Authentication',
  function(Authentication) {
    var vm = this;

    vm.authentication = Authentication;
  }
]);