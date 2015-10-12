describe('PersonResource', function () {

  beforeEach(module('myApp'));

  var
    $httpBackend,
    persons = [
      { first: 'Frank', route: 'frank' },
      { first: 'Mike', route: 'mike' },
      { first: 'Mark', route: 'mark' }
    ],
    personResource;

  beforeEach(angular.mock.inject(function (_$httpBackend_, _PersonResource_) {
    personResource = _PersonResource_;

    $httpBackend = _$httpBackend_;

    $httpBackend.expectGET('scripts/persons/persons.json').respond(persons);
  }));

  it('should call the url scripts/persons/persons.json and return an array with persons', function () {
    personResource.query();
    $httpBackend.flush();
  });

});
