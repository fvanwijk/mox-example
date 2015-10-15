angular.module('moxExample')
  .directive('toDoItem', function () {
    return {
      scope: {
        item: '='
      },
      template: '<li><a href ng-click="done != done">{{item.content}}</a></li>'
    };
  });
