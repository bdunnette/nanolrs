'use strict';

angular
  .module('attachmentsApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'CornerCouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
