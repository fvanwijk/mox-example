describe('persons.html', function () {

  var
    $scope,
    element,
    template = 'scripts/persons/persons.html',
    persons = getJSONFixture('persons.json');

  beforeEach(function () {
    mox
      .module('myApp', template)
      .mockServices('personService')
      .mockDirectives('personsDirective')
      .setupResults(function () {
        return {
          personService: {
            getPersons: promise(persons)
          }
        };
      })
      .run();

    $scope = createScope({
      persons: persons
    });
    element = addSelectors(compileTemplate(template, $scope), {
      persons: 'ul li',
      personsDirective: '[persons-directive]'
    });
  });

  it('should have a list of persons', function () {
    expect(element.persons()).toHaveLength(3);
    expect(element.persons().eq(0)).toHaveText('Frank - frank');
    expect(element.persons().eq(0)).toHaveText(persons[0].first + ' - ' + persons[0].route);
  });

  it('should have a personsDirective', function () {
    expect(element.personsDirective()).toContainIsolateScope({
      persons: persons
    });
  });

  xdescribe('the link between controller and view (midway test)', function () {
    it('should have the same persons on the scope', function () {
      // TODO: service wegmocken
      var ctrlScope = createScope();
      createController('PersonController', ctrlScope);
      $scope.$digest();

      expect(ctrlScope.persons).toEqual(persons);
      //var element = compileTemplate(template, ctrlScope);
    });
  });
});
