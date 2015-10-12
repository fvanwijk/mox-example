describe('personsDirective', function () {

  beforeEach(module('myApp'));

  var
    $scope,
    element,
    persons = [
      { first: 'Frank', route: 'frank' },
      { first: 'Mike', route: 'mike' },
      { first: 'Mark', route: 'mark' }
    ];

  beforeEach(angular.mock.inject(function ($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.persons = persons;
    element = $compile('<div persons-directive="persons"></div>')($scope);
    $scope.$digest();
  }));

  it('should have a list of persons', function () {
    expect(element.find('ul li').length).toBe(3);
    expect(element.find('ul li').eq(0).text()).toBe(persons[0].first);
    expect(element.find('ul li a').eq(0).attr('href')).toBe('#/' + persons[0].route);
  });

});
