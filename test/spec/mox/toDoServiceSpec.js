describe('ToDoService', function () {

  var toDoList = getJSONFixture('toDoList.json');

  beforeEach(function () {
    mox
      .module('moxExample')
      .mockServices('ToDoResource')
      .setupResults(function () {
        return {
          ToDoResource: { query: resourceResult(toDoList) }
        };
      })
      .run();
  });

  describe('the getToDoList method', function () {

    it('should return list of ToDoResources', function () {
      expect(mox.inject('ToDoService').getToDoList()).toHaveBeenResolvedWith(toDoList);
    });

  });
});
