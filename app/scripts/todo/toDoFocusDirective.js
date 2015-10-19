angular.module('moxExample')
  .directive('toDoFocus', function ($timeout) {
    return function ($scope, elem, attrs) {
      $scope.$watch(attrs.toDoFocus, function (newVal) {
        if (newVal) {
          $timeout(function () {
            elem[0].focus();
          }, 0, false);
        }
      });
    };
  });
