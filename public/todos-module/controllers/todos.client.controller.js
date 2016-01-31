angular.module('todos').controller('TodosController', ['$routeParams', '$location', 'Authentication', 'Todos',
  function($routeParams, $location, Authentication, Todos) {

    var vm = this;

    vm.authentication = Authentication;

    vm.create = function() {
      var todo = new Todos({
        // MIGHT NEED TO SET this TO vm
        title: vm.title,
        comment: vm.comment
      });

      todo.$save(function(response) {
        $location.path('todos/' + response._id);
      }, function(errorResponse) {
        vm.error = errorResponse.data.message;
      });
    };

    vm.find = function() {
      vm.todos = Todos.query();
      console.log(vm.todos);
    };

    vm.findOne = function() {
      vm.todo = Todos.get({
        todoId: $routeParams.todoId
      });
    };

    vm.update = function() {
      vm.todo.$update(function() {
        $location.path('todos/' + vm.todo._id);
      }, function(errorResponse) {
        vm.error = errorResponse.data.message;
      });
    };

    vm.delete = function(todo) {
      if(todo) {
        todo.$remove(function() {
          for(var i in vm.todos) {
            if(vm.todos[i] === todo) {
              vm.todos.splice(i, 1);
            }
          }
        });
      }
      else {
        vm.todo.$remove(function() {
          $location.path('todos');
        });
      }
    };
  }
]);