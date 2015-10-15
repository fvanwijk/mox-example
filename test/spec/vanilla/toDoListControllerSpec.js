describe('ToDoListController', function () {

  var
    $controller,
    $scope,
    toDoList = [
      { content: 'Start new project', done: true },
      { content: 'Include Mox', done: false },
      { content: 'Write tests', done: false }
    ],
    ToDoService = jasmine.createSpyObj('ToDoService', ['getToDoList', 'saveToDoItem']);

  function initController() {
    $controller('ToDoListController', {
      $scope: $scope,
      ToDoService: ToDoService
    });
    $scope.$digest();
  }

  beforeEach(function () {
    module('moxExample');
    angular.mock.inject(function (_$controller_, $rootScope) {
      $controller = _$controller_;
      $scope = $rootScope.$new();
    });
  });

  describe('the getToDoList method', function () {
    var $q;

    beforeEach(angular.mock.inject(function (_$q_) {
      $q = _$q_;
    }));

    it('should attach a to do list to the scope', function () {
      ToDoService.getToDoList.and.returnValue($q.when(toDoList));

      initController();

      expect($scope.toDoList).toBe(toDoList);
    });

    it('should $log a message when it fails', angular.mock.inject(function ($log) {
      spyOn($log, 'log');
      var msg = { data: 'MISPOES!' };
      ToDoService.getToDoList.and.returnValue($q.reject(msg));

      initController();

      expect($log.log).toHaveBeenCalledWith(msg.data);
    }));
  });
});
