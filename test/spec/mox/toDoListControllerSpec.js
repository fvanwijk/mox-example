describe('ToDoListController', function () {

  var
    $log,
    $scope,
    toDoList = getJSONFixture('toDoList.json');

  function initController() {
    createController('ToDoListController', $scope);
    $scope.$digest();
  }

  beforeEach(function () {
    mox
      .module('moxExample')
      .mockServices('ToDoService')
      .setupResults(function () {
        return {
          ToDoService: {
            getToDoList: promise(toDoList),
            saveToDoItem: promise(toDoList[0])
          }
        };
      })
      .run();

    $scope = createScope();
    
    // We could also mock $log
    $log = mox.inject('$log');
    spyOn($log, 'log');
  });

  describe('on initialization', function () {

    it('should attach a to do list to the scope', function () {
      initController();
      expect($scope.toDoList).toEqual(toDoList);
    });

    it('should $log a message when it fails', function () {
      var msg = { data: 'FAIL!' };
      mox.get.ToDoService.getToDoList.and.returnValue(reject(msg));

      initController();

      expect($log.log).toHaveBeenCalledWith(msg.data);
    });

  });

  describe('the save() scope method', function () {
    var saveResult;

    beforeEach(function () {
      initController();
      saveResult = $scope.save(toDoList[0]);
    });

    it('should save the ToDoItem via the ToDoService', function () {
      expect(mox.get.ToDoService.saveToDoItem).toHaveBeenCalledWith(toDoList[0]);
    });

    it('should return the result promise', function () {
      expect(saveResult).toResolveWith(toDoList[0]);
    });

    describe('when the ToDoService rejects', function () {
      beforeEach(function () {
        mox.get.ToDoService.saveToDoItem.and.returnValue(reject('Fail!'));
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
