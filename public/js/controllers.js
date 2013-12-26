'use strict';

/* Controllers */

angular.module('Fittr')
.controller('AppCtrl', function ($scope, $http) {
	$scope.name = 'Fittr';
}).
controller('Signup', function ($scope, $http) {
	$scope.name = 'Signup';
	$scope.auth = function() {
		$http({
			method: 'GET',
			url: 'http://127.0.0.1:3000/auth/facebook'
		}).success(function(data) {
			console.log('data', data);
		}).error(function() {
			console.log('damn');
		});
	};

}).
controller('Dashboard', function ($scope) {
	$scope.name = 'Dash';
});
