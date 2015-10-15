describe('toDoList.html', function () {

  var
    $scope,
    element,
    template = 'scripts/todo/toDoList.html',
    toDoList = getJSONFixture('toDoList.json');

  beforeEach(function () {
    mox
      .module('moxExample', template)
      .mockServices('ToDoService')
      .mockDirectives('toDoItem')
      .setupResults(function () {
        return {
          ToDoService: {
            getToDoList: promise(toDoList)
          }
        };
      })
      .run();

    $scope = createScope({
      toDoList: toDoList
    });
    element = addSelectors(compileTemplate(template, $scope), {
      item: 'ul li',
      toDoItem: 'to-do-item'
    });
  });

  xdescribe('the link between controller and view (midway test)', function () {
    it('should have the same toDoList on the scope', function () {
      // TODO: service wegmocken
      var ctrlScope = createScope();
      createController('ToDoListController', ctrlScope);
      $scope.$digest();

      expect(ctrlScope.toDoList).toEqual(toDoList);
      //var element = compileTemplate(template, ctrlScope);
    });
  });
});
