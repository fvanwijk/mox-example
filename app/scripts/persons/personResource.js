angular.module('myApp')
  .factory('PersonResource', function ($resource) {
    return $resource('scripts/persons/persons.json');
  });
