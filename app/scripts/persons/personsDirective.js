angular.module('myApp').directive('personsDirective', function () {
  return {
    scope: { persons: '=personsDirective' },
    template: '<ul>' +
              '<li ng-repeat="person in persons"><a ng-href="#/{{person.route}}">{{person.first}}</a></li>' +
              '</ul>'
  };
});
