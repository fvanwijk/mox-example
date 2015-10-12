describe('personsDirective', function () {

  var
    $scope,
    element,
    persons = getJSONFixture('persons.json');

  beforeEach(function () {
    mox
      .module('myApp')
      .run();

    $scope = createScope({
      persons: persons
    });
    element = addSelectors(compileHtml('<div persons-directive="persons"></div>', $scope), {
      persons: 'ul li',
      links: 'ul li a'
    });
  });

  it('should have a list of persons', function () {
    expect(element.persons()).toHaveLength(persons.length);
    expect(element.persons().eq(0)).toHaveText(persons[0].first);
    expect(element.links().eq(0)).toHaveAttr('ng-href', '#/' + persons[0].route);
  });

});
