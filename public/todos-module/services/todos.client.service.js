angular.module('todos').factory('Todos', ['$resource',
  function($resource) {
    return $resource('api/todos/:todoId', {
      // Set todoId to _id of current data object
      todoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);