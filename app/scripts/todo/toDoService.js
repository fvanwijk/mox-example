angular.module('moxExample')
  .factory('ToDoService', function (ToDoResource) {
    return {
      getToDoList: function () {
        return ToDoResource.query().$promise;
      },
      saveToDoItem: function (toDoItem) {
        return toDoItem.$save();
      }
    };
  });
