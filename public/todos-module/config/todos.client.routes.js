angular.module('todos').config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/todos', {
        templateUrl: 'todos-module/views/list-todos.client.view.html'
      })
      .when('/todos/create', {
        templateUrl: 'todos-module/views/create-todo.client.view.html'
      })
      .when('/todos/:todoId', {
        templateUrl: 'todos-module/views/view-todo.client.view.html'
      })
      .when('/todos/:todoId/edit', {
        templateUrl: 'todos-module/views/edit-todo.client.view.html'
      });
  }
]);