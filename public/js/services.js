'use strict';

/* Services */

angular.module('Fittr')
.factory('authResponseInterceptor', function($q, $location) {
	return function(promise) {
		console.log('promise', promise);
      return promise.then(
        function(response){
          return response;
        },
        function(response) {
          console.log('response', response);
          if(response.status === 401){
            console.log('here')
            $location.url('/');
          }
          return $q.reject(response);
        }
      );
    }
})
.factory('FitbitData', function($http, $location) {
  return {
    retrieve: function(dates, callback) {
      $http({
        method: 'GET',
        url: '/user/activity'
      }).success(function(data){
        console.log('steps data', data);
        callback(data);
      }).error(function(){
        console.log('error on getting data');
      });
    },

    update: function(data) {
      $http({
        method: 'POST',
        url: '/fitbit/update/email',
        data: {email: data}
      }).success(function(stuff) {
        console.log('sent email');
      }).error(function(err) {
        console.log('could not update email');
      });
    }
  }
})
//==========================================
//  factory function to find the average
//  number of steps per day for all fitbit
//  users.
//==========================================
.factory('AverageSteps', function($http) {
  return {
    getData: function(callback) {
      // AJAX call to query our database
      $http({
        method: 'GET',
        url: '/users/activity/2013-01-01',
      }).success(function(data) {
        callback(data);
      }).error(function(err) {
        console.log('error getting average steps ', err);
      });
    }
    // TODO: once the worker is up and running, make
    // getData also take in 2 date params to modify the
    // AJAX call's url. Might need to make it a separate
    // function for it, if we still want to use global data.
  }
});

