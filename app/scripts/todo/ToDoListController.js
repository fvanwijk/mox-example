angular.module('moxExample')
  .controller('ToDoListController', function ($log, $scope, ToDoService) {
    ToDoService.getToDoList()
      .then(function (list) {
        $scope.toDoList = list;
      })
      .catch(function (error) {
        $log.log(error.data);
      });

    $scope.save = function (toDoItem) {
      ToDoService.savePerson(toDoItem)
        .catch(function () {
          $log.log('Error while saving');
        });
    };
  });
