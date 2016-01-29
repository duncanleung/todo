angular.module('main').controller('MainController', ['Authentication',
  function(Authentication) {
    var vm = this;

    vm.authentication = Authentication;
  }
]);