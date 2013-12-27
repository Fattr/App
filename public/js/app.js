'use strict';

// Declare app level module which depends on filters, and services

angular.module('Fittr', [
  'ngRoute'
])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  console.log('HTTP stuff',$httpProvider.defaults);
  $httpProvider.defaults.XDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $routeProvider.
    when('/signup', {
      templateUrl: '../views/signup.html',
      controller: 'Signup'
    }).
    when('/dashboard', {
      templateUrl: '../views/dashboard.html',
      controller: 'Dashboard'
    }).
    when('/signout', {
      redirectTo: '/'
    }).
    otherwise({
      redirectTo: '/'
    });
});
