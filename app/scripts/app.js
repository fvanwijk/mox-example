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
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/todo/todoList.html',
        controller: 'ToDoListController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
