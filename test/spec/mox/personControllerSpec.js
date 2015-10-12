describe('PersonController', function () {

  var
    $log,
    $scope,
    persons = getJSONFixture('persons.json');

  function initController() {
    createController('PersonController', $scope);
    $scope.$digest();
  }

  beforeEach(function () {
    mox
      .module('myApp')
      .mockServices('personService')
      .setupResults(function () {
        return {
          personService: { getPersons: promise(persons) }
        };
      })
      .run();

    $scope = createScope();
  });

  it('should have hideList true', function () {
    initController();
    expect($scope.hideList).toBe(true);
  });

  describe('the getPersons method', function () {

    it('should attach a list of Persons to the scope', function () {
      initController();
      expect($scope.persons).toEqual(persons);
    });

    it('should $log a message when it fails', function () {
      $log = mox.inject('$log');
      spyOn($log, 'log');
      var msg = { data: 'MISPOES!' };
      mox.get.personService.getPersons.and.returnValue(reject(msg));

      initController();

      expect($log.log).toHaveBeenCalledWith(msg.data);
    });

  });
});
