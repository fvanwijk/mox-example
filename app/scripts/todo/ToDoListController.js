angular.module('moxExample')
  .controller('ToDoListController', function (
    $log,
    $routeParams,
    $scope,
    filterFilter,
    ToDoService
  ) {
    $scope.status = $routeParams.status || '';
    $scope.statusFilter = ( $scope.status === 'active') ?
      { done: false } : ( $scope.status === 'completed') ?
      { done: true } : {};
    $scope.toDoList = [];

    ToDoService.getToDoList()
      .then(function (list) {
        $scope.toDoList = list;
      })
      .catch(function (error) {
        $log.log(error.data);
      });

    $scope.$watch('toDoList', function () {
      $scope.remainingCount = filterFilter($scope.toDoList, { done: false }).length;
      $scope.completedCount = $scope.toDoList.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    $scope.addToDoItem = function () {
      var newToDoItem = {
        content: $scope.newToDoItem.trim(),
        done: false
      };
      if (!newToDoItem.content) {
        return;
      }
      $scope.toDoList.push(newToDoItem);
      $scope.newToDoItem = '';
    };

    $scope.markAll = function () {
      $scope.toDoList.forEach(function (toDoItem) {
        toDoItem.done = $scope.allChecked;
      });
    };

    $scope.remove = function ($index) {
      $scope.toDoList.splice($index, 1);
    };

    $scope.clearCompleted = function () {
      $scope.toDoList =  $scope.toDoList.filter(function (toDoItem) {
        return !toDoItem.done;
      });
    };

    $scope.editToDoItem = function (toDoItem) {
      $scope.editedToDoItem = toDoItem;
      $scope.originalToDoItem = angular.extend({}, toDoItem);
    };

    $scope.saveEdits = function (toDoItem, event) {
      if (event === 'blur' && $scope.saveEvent === 'submit') {
        delete $scope.saveEvent;
        return;
      }
      $scope.saveEvent = event;

      if ($scope.reverted) {
        delete $scope.reverted;
        return;
      }

      toDoItem.content = toDoItem.content.trim();

      if (!toDoItem.content) {
        $scope.remove($scope.toDoList.indexOf(toDoItem));
      }
      delete $scope.editedToDoItem;
    };

    $scope.revertEdits = function (todo) {
      $scope.toDoList[$scope.toDoList.indexOf(todo)] = $scope.originalToDoItem;
      delete $scope.editedToDoItem;
      delete $scope.originalToDoItem;
      $scope.reverted = true;
    };

    $scope.save = function (toDoItem) {
      return ToDoService.saveToDoItem(toDoItem)
        .catch(function () {
          $log.log('Error while saving');
        });
    };
  });
