angular.module('moxExample')
  .directive('toDoFilters', function () {
    return {
      scope: {
        status: '='
      },
      templateUrl: 'scripts/todo/toDoFilters.html',
      link: function ($scope) {
        $scope.filters = [
          { status: '', path: '#/', name: 'All' },
          { status: 'active', path: '#/active', name: 'Active' },
          { status: 'completed', path: '#/completed', name: 'Completed' }
        ];
      }
    };
  });
