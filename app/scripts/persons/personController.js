angular.module('myApp')
  .controller('PersonController', function ($log, $scope, personService) {
    personService.getPersons()
      .then(function (persons) {
        $scope.persons = persons;
      })
      .catch(function (error) {
        $log.log(error.data);
      });

    $scope.save = function (person) {
      personService.savePerson(person)
        .catch(function () {
          $log.log('Er ging iets mis met saven');
        });
    };

    $scope.hideList = true;
  });
