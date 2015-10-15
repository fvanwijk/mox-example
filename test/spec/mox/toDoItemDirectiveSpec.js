describe('toDoItem directive', function () {

  var
    $scope,
    element,
    toDoList = getJSONFixture('toDoList.json');

  beforeEach(function () {
    mox
      .module('moxExample')
      .run();

    $scope = createScope({
      list: toDoList
    });
    element = addSelectors(compileHtml('<to-do-item item="list[0]"></to-do-item>', $scope), {
      link: 'a'
    });
  });

  it('should show a to do item', function () {
    expect(element).toHaveText(toDoList[0].content);
  });

});
