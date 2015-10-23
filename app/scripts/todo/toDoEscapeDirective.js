angular.module('moxExample')
  .constant('ESCAPE_KEY', 27)
  .directive('toDoEscape', function (ESCAPE_KEY) {
    return function ($scope, elem, attrs) {
      elem.bind('keydown', function (event) {
        if (event.keyCode === ESCAPE_KEY) {
          $scope.$apply(attrs.toDoEscape);
        }
      });

      $scope.$on('$destroy', function () {
        elem.unbind('keydown');
      });
    };
  });
