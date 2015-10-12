describe('PersonService', function () {

  var personResource;

  beforeEach(module('myApp', function ($provide) {
    personResource = jasmine.createSpyObj('PersonResource', ['get', 'query']);
    $provide.value('PersonResource', personResource);
  }));

  var
    $scope,
    persons = [
      { first: 'Frank', route: 'frank' },
      { first: 'Mike', route: 'mike' },
      { first: 'Mark', route: 'mark' }
    ],
    personService;

  beforeEach(angular.mock.inject(function ($q, $rootScope, _personService_) {
    $scope = $rootScope.$new();

    personService = _personService_;

    personResource.query.and.returnValue({
      $promise: $q.when(persons)
    });

  }));

  describe('the getPersons method', function () {

    it('should return list of PersonResources', function () {

      var personsResult;

      personService.getPersons()
        .then(function (result) {
          personsResult = result;
        });

      $scope.$digest();
      expect(personsResult).toEqual(persons);

    });

    it('should return list of PersonResource (better way)', function () {
      var successCb = jasmine.createSpy('success');
      var errorCb = jasmine.createSpy('error');

      personService.getPersons()
        .then(successCb, errorCb);

      $scope.$digest();
      expect(successCb).toHaveBeenCalledWith(persons);
      expect(errorCb).not.toHaveBeenCalled();
    });
  });

  describe('the savePerson method', function () {

  });
});
