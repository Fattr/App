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
          if(response.status === 401){
            console.log('here')
            $location.url('/');
          }
          return $q.reject(response);
        }
      );
    }
})

