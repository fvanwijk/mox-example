'use strict';

/**
 * @ngdoc overview
 * @name moxExample
 * @description
 * # myApp
 *
 * Main module of the application.
 */
angular
  .module('moxExample', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    var routeConfig = {
      templateUrl: 'scripts/todo/todoList.html',
      controller: 'ToDoListController'
    };

    $routeProvider
      .when('/', routeConfig)
      .when('/:status', routeConfig)
      .otherwise({
        redirectTo: '/'
      });
  });
