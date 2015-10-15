angular.module('moxExample')
  .factory('ToDoResource', function ($resource) {
    return $resource('scripts/todo/toDoList.json');
  });
