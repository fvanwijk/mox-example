var m = mox.helpers;

mox.factories = {
  $routeParams: function ($provide, params) {
    var mock = angular.extend({}, params || {});
    mox.save($provide, '$routeParams', mock);
    return mock;
  }
};
