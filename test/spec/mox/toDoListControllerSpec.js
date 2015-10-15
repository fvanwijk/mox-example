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
          ToDoService: { getToDoList: promise(toDoList) }
        };
      })
      .run();

    $scope = createScope();
  });

  describe('the getList method', function () {

    it('should attach a to do list to the scope', function () {
      initController();
      expect($scope.toDoList).toEqual(toDoList);
    });

    it('should $log a message when it fails', function () {
      $log = mox.inject('$log');
      spyOn($log, 'log');
      var msg = { data: 'FAIL!' };
      mox.get.ToDoService.getToDoList.and.returnValue(reject(msg));

      initController();

      expect($log.log).toHaveBeenCalledWith(msg.data);
    });

  });
});
