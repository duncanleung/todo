angular.module('main').controller('mainController', ['Authentication', function(Authentication) {
    var vm = this;

    vm.authentication = Authentication;
  }
]);