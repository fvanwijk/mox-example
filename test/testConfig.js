// This file is only loaded in Wallaby when this file is required/imported in a spec file
// The Vanilla specs pass in Wallaby because nothing from this file is used. No Mox, no JSON fixtures

import {mox} from 'angular-mox';
window.mox = mox;
window.m = mox.helpers;

mox.factories = {
  $routeParams: function ($provide, params) {
    var mock = angular.extend({}, params || {});
    mox.save($provide, '$routeParams', mock);
    return mock;
  }
};

var path = typeof window.__karma__ !== 'undefined' ? 'base/' : '';
jasmine.getJSONFixtures().fixturesPath = path + 'test/mock';
jasmine.getFixtures().fixturesPath = path + 'test/mock/html';
