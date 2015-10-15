describe('toDoItemDirective', function () {

  beforeEach(module('moxExample'));

  var
    $scope,
    element,
    toDoList = [
      { content: 'Start new project', done: true },
      { content: 'Include Mox', done: false },
      { content: 'Write tests', done: false }
    ];

  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.toDoList = toDoList;
    element = $compile('<to-do-item item="toDoList[0]"></to-do-item>')($scope);
    $scope.$digest();
  }));

  it('should show a to do item', function () {
    expect(element.text()).toBe(toDoList[0].content);
  });

});
