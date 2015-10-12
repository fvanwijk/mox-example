describe('PersonController', function () {

  var
    $controller,
    $scope,
    persons = [
      { first: 'Frank', route: 'frank' },
      { first: 'Mike', route: 'mike' },
      { first: 'Mark', route: 'mark' }
    ],
    personService = jasmine.createSpyObj('PersonService', ['getPersons', 'savePerson']);

  function initController() {
    $controller('PersonController', {
      $scope: $scope,
      personService: personService
    });
    $scope.$digest();
  }

  beforeEach(function () {
    module('myApp');
    angular.mock.inject(function (_$controller_, $rootScope) {
      $controller = _$controller_;
      $scope = $rootScope.$new();
    });
  });

  describe('the getPersons method', function () {
    var $q;

    beforeEach(angular.mock.inject(function (_$q_) {
      $q = _$q_;
    }));

    it('should attach a list of Persons to the scope', function () {
      personService.getPersons.and.returnValue($q.when(persons));

      initController();

      expect($scope.persons).toBe(persons);
    });

    it('should $log a message when it fails', angular.mock.inject(function ($log) {
      spyOn($log, 'log');
      var msg = { data: 'MISPOES!' };
      personService.getPersons.and.returnValue($q.reject(msg));

      initController();

      expect($log.log).toHaveBeenCalledWith(msg.data);
    }));
  });
});
