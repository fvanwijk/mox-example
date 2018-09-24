angular.module('moxExample')
  .filter('upper', function () {
    return function (input, isActive) {
      return isActive ? input.toUpperCase() : input;
    };
  });
