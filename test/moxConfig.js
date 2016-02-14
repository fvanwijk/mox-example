angular.extend(moxConfig, {
  $routeParams: function ($provide, params) {
    var mock = angular.extend({}, params || {});
    mox.save($provide, '$routeParams', mock);
    return mock;
  }
});
