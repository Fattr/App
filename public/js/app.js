// 'use strict';

// Declare app level module which depends on filters, and services

angular.module('Fittr', [
  'ngRoute',
  'nvd3ChartDirectives'
])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  var checkAuth = function($q, $location, $http, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user) {
      if( user !== '0') {
        $rootScope.user = user;
        deferred.resolve();
      } else {
        $rootScope.error_message = 'You must be logged in!';
        deferred.reject();
        $location.url('/auth/facebook');
      }
    });
    return deferred.promise;
  };

  $httpProvider.responseInterceptors.push(function($q, $location) {
    return function(promise) {
      return promise.then(
        function(response){
          return response;
        },
        function(response) {
          if(response.status === 401){
            $location.url('/auth/facebook');
          }
          return $q.reject(response);
        }
      );
    }
  });

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
