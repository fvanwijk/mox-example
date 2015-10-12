describe('persons.html', function () {

  var
    $compile,
    $rootScope,
    $scope,
    $templateCache,
    element,
    template = 'scripts/persons/persons.html',
    persons = [
      { first: 'Frank', route: 'frank' },
      { first: 'Mike', route: 'mike' },
      { first: 'Mark', route: 'mark' }
    ];

  function compileTemplate(scope) {
    return $compile('<div>' + $templateCache.get(template) + '</div>')(scope);
  }

  beforeEach(function () {
    module('myApp', 'scripts/persons/persons.html');

    angular.mock.inject(function (_$compile_, _$rootScope_, _$templateCache_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;

      $scope = $rootScope.$new();
      $scope.persons = persons;
      element = compileTemplate($scope);
      $scope.$digest();
    });
  });

  it('should have a list of persons', function () {
    var personsElement = element.find('ul#persons li[ng-repeat]');
    expect(personsElement.eq(0).text()).toBe('Frank - frank');
  });

  it('should have a personsDirective', function () {
    expect(element.find('[persons-directive]').attr('persons-directive')).toBe('persons');
  });

  xdescribe('the link between controller and view (midway test)', function () {
    it('should have the same persons on the scope', angular.mock.inject(function ($controller, $httpBackend) {
      $httpBackend.expectGET('scripts/persons/persons.json').respond(persons);

      var ctrlScope = $rootScope.$new();
      $controller('PersonController', {
        $scope: ctrlScope
      });
      $httpBackend.flush();

      var midwayElement = compileTemplate(ctrlScope);
      ctrlScope.$digest();

      expect(midwayElement.find('ul#persons li[ng-repeat]').length).toBe(3);
    }));
  });
});
