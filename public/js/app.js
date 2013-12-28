// 'use strict';

// Declare app level module which depends on filters, and services

angular.module('Fittr', [
  'ngRoute',
  'nvd3ChartDirectives'
])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  var checkAuth = function($q, $location, $http, $rootScope) {
    $rootScope.title = 'Fittr';// set title for app
    $rootScope.user = null; //FIXME: init the user and set to null, move out of $rootScope and into 'AppCtlr'
    $rootScope.isAuth = function(){ // check for auth, use this function to hide and show links on templates
      return $rootScope.user;
    };
    var deferred = $q.defer();
    // promise for ajax call to server to check if the user is authenticated
    $http.get('/loggedin').success(function(user) {
      if( user !== '0') {
        $rootScope.user = user; // if user is auth, then set $rootScope user to current user
        deferred.resolve();
      } else {
        $rootScope.error_message = 'You must be logged in!'; // messgae used as error, can be manipulated in templates
        deferred.reject();
        $location.url('/'); // if user is not auth, then redirect to index
      }
    });
    return deferred.promise;
  };

  // intercept all '401's from server, meaning user is not auth to access that route
  // will use to protect the server from un auth users trying to access saved data in the db
  // authResponseInterceptor is defined in service.js
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
