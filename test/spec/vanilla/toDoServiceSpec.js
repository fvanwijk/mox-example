describe('ToDoService', function () {

  var toDoResource;

  beforeEach(module('moxExample', function ($provide) {
    toDoResource = jasmine.createSpyObj('ToDoResource', ['get', 'query']);
    $provide.value('ToDoResource', toDoResource);
  }));

  var
    $scope,
    toDoList = [
      { content: 'Start new project', done: true },
      { content: 'Include Mox', done: false },
      { content: 'Write tests', done: false }
    ],
    ToDoService;

  beforeEach(angular.mock.inject(function ($q, $rootScope, _ToDoService_) {
    $scope = $rootScope.$new();

    ToDoService = _ToDoService_;

    toDoResource.query.and.returnValue({
      $promise: $q.when(toDoList)
    });

  }));

  describe('the getToDoList method', function () {

    it('should return list of ToDoResources', function () {

      var toDoResult;

      ToDoService.getToDoList()
        .then(function (result) {
          toDoResult = result;
        });

      $scope.$digest();
      expect(toDoResult).toEqual(toDoList);

    });

    it('should return list of ToDoResources (better way)', function () {
      var successCb = jasmine.createSpy('success');
      var errorCb = jasmine.createSpy('error');

      ToDoService.getToDoList()
        .then(successCb, errorCb);

      $scope.$digest();
      expect(successCb).toHaveBeenCalledWith(toDoList);
      expect(errorCb).not.toHaveBeenCalled();
    });
  });

  describe('the saveToDo method', function () {

  });
});
