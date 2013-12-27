// 'use strict';

// Declare app level module which depends on filters, and services

angular.module('Fittr', [
  'ngRoute',
  'nvd3ChartDirectives'
])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  var checkAuth = function($q, $location, $http, $location, $rootScope) {
    $rootScope.user = null;
    $rootScope.isAuth = function(){
      return $rootScope.user;
    };
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user) {
      if( user !== '0') {
        $rootScope.user = user;
        deferred.resolve();
      } else {
        $rootScope.error_message = 'You must be logged in!';
        deferred.reject();
        $location.url('/');
      }
    });
    return deferred.promise;
  };

  $httpProvider.responseInterceptors.push('authResponseInterceptor');
  $routeProvider.
    when('/signup', {
      templateUrl: '../views/signup.html',
      controller: 'Signup'
    }).
    when('/dashboard', {
      templateUrl: '../views/dashboard.html',
      controller: 'Dashboard',
      resolve: {
        loggedin: checkAuth
      }
    }).
    when('/signout', {
      redirectTo: '/'
    }).
    otherwise({
      redirectTo: '/'
    });
});
