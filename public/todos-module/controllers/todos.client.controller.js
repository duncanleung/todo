angular.module('todos').controller('TodosController', ['$scope', '$routeParams', '$location', '$filter', 'Authentication', 'Todos',
  function($scope, $routeParams, $location, $filter, Authentication, Todos) {

    var vm = this;

    vm.authentication = Authentication;

    vm.create = function() {
      var newTodo = new Todos({
        title: vm.newTodo,
        comment: vm.comment
      });

      // Send newTodo to server for storage
      newTodo.$save(function(todo) {
      }, function(errorResponse) {
        vm.error = errorResponse.data.message;
      });

      // Add newTodo into list of Todos
      if(newTodo.title) {
        vm.todos.unshift(newTodo);
      }
      // Reset input field
      vm.newTodo = '';
    };

    vm.find = function() {
      vm.todos = Todos.query();
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
    };

    vm.checkAll = function() {
      vm.toggleAll = !vm.toggleAll;

      angular.forEach(vm.todos, function(todo) {
        todo.completed = vm.toggleAll;
        todo.$update();
      });
    };

    vm.clearCompleted = function() {
      var uncompletedTodos = [];
      angular.forEach(vm.todos, function(todo) {
        if(todo.completed) {
          todo.$remove();
        } else {
          uncompletedTodos.push(todo);
        }
      });

      vm.todos = uncompletedTodos;
    };

    // Watch Equality by Value (Third Param to True)
    $scope.$watch(function() {
      return vm.todos;
    }, function() {
      vm.remainingCount = $filter('filter')(vm.todos, { completed: false }).length;
      vm.completedCount = $filter('filter')(vm.todos, { completed: true }).length;
    }, true);

    vm.clearSearch = function() {
      vm.search = '';
    };
  }
]);