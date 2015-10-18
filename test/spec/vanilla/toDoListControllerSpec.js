describe('ToDoListController', function () {

  var
    $controller,
    $log,
    $q,
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
    angular.mock.inject(function (_$controller_, _$log_, _$q_, $rootScope) {
      $controller = _$controller_;
      $log = _$log_;
      $q = _$q_;
      $scope = $rootScope.$new();

      spyOn($log, 'log');
    });

    ToDoService.getToDoList.and.returnValue($q.when(toDoList));
  });

  describe('on initialization', function () {
    it('should start with an empty to do list', function () {
      $controller('ToDoListController', {
        $scope: $scope,
        ToDoService: ToDoService
      });
      expect($scope.toDoList).toEqual([]);
    });

    it('should attach a to do list to the scope', function () {
      initController();

      expect($scope.toDoList).toBe(toDoList);
    });

    it('should $log a message when it fails', function () {
      var msg = { data: 'FAIL!' };
      ToDoService.getToDoList.and.returnValue($q.reject(msg));

      initController();

      expect($log.log).toHaveBeenCalledWith(msg.data);
    });
  });

  describe('the save() scope method', function () {
    var saveResult;

    beforeEach(function () {
      ToDoService.saveToDoItem.and.returnValue($q.when(toDoList[0]));
      initController();

      saveResult = $scope.save(toDoList[0]);
    });

    it('should save the ToDoItem via the ToDoService', function () {
      expect(ToDoService.saveToDoItem).toHaveBeenCalledWith(toDoList[0]);
    });

    it('should return the result promise', function () {
      expect(saveResult).toResolveWith(toDoList[0]);
    });

    describe('when the ToDoService rejects', function () {
      beforeEach(function () {
        ToDoService.saveToDoItem.and.returnValue($q.reject('Fail!'));

        initController();
      });

      it('should log an error', function () {
        $scope.save(toDoList[0]);
        $scope.$digest();
        expect($log.log).toHaveBeenCalledWith('Error while saving');
      });
    });
  });
});
