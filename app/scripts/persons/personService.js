angular.module('myApp')
  .factory('personService', function (PersonResource) {
    return {
      getPersons: function () {
        return PersonResource.query().$promise;
      },
      savePerson: function (person) {
        return person.$save();
      }
    };
  });
