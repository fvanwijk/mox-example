describe('ToDoService', function () {

  var toDoList = getJSONFixture('toDoList.json'),
    ToDoService;

  beforeEach(function () {
    mox
      .module('moxExample')
      .mockServices('ToDoResource')
      .setupResults(function () {
        return {
          ToDoResource: { query: m.resourceResult(toDoList) }
        };
      })
      .run();

    ToDoService = m.inject('ToDoService');
  });

  describe('the getToDoList method', function () {

    it('should return list of ToDoResources', function () {
      expect(ToDoService.getToDoList()).toHaveBeenResolvedWith(toDoList);
    });

  });

  describe('the saveToDoList method', function () {
    it('should save the ToDoResource', function () {
      ToDoService.saveToDoItem(new mox.get.ToDoResource.constructor());
      expect(mox.get.ToDoResource.$save).toHaveBeenCalled();
    });
  });
});
