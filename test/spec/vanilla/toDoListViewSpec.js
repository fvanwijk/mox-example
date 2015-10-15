describe('toDoList.html', function () {

  var
    $compile,
    $rootScope,
    $scope,
    $templateCache,
    element,
    template = 'scripts/todo/toDoList.html',
    toDoList = [
      { content: 'Start new project', done: true },
      { content: 'Include Mox', done: false },
      { content: 'Write tests', done: false }
    ];

  function compileTemplate(scope) {
    return $compile('<div>' + $templateCache.get(template) + '</div>')(scope);
  }

  beforeEach(function () {
    module('moxExample', 'scripts/todo/toDoList.html');

    angular.mock.inject(function (_$compile_, _$rootScope_, _$templateCache_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;

      $scope = $rootScope.$new();
      $scope.toDoList = toDoList;
      element = compileTemplate($scope);
      $scope.$digest();
    });
  });

  xdescribe('the link between controller and view (midway test)', function () {
    it('should have the same toDoList on the scope', angular.mock.inject(function ($controller, $httpBackend) {
      $httpBackend.expectGET('scripts/toDoList/toDoList.json').respond(toDoList);

      var ctrlScope = $rootScope.$new();
      $controller('ToDoListController', {
        $scope: ctrlScope
      });
      $httpBackend.flush();

      var midwayElement = compileTemplate(ctrlScope);
      ctrlScope.$digest();

      expect(midwayElement.find('ul#toDoList li[ng-repeat]').length).toBe(3);
    }));
  });
});
