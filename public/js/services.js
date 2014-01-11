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
            console.log('interception!!!');
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
        url: '/user/activity/'+dates.from +'/'+dates.to
      }).success(function(data){
        console.log('single user steps data', data);
        callback(data);
      }).error(function(){
        console.log('error on getting data');
      });
    },

    update: function(data) {
      $http({
        method: 'POST',
        url: '/update/email',
        data: {email: data}
      }).success(function(stuff) {
        console.log('sent email');
      }).error(function(err) {
        console.log('could not update email');
      });
    },
    getData: function(dates, callback) {
      // AJAX call to query our database
      $http({
        method: 'GET',
        url: '/users/activity/'+dates.from+'/'+dates.to // dates object will have from and to dates to tie on to the url here
      }).success(function(data) {
        callback(data);
      }).error(function(err) {
        console.log('error getting average steps ', err);
      });
    }
  }
});


