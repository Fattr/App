'use strict';

/* Controllers */

angular.module('Fittr')
.controller('AppCtrl', function ($scope, $http) {
  $scope.name = 'Fittr';
}).
controller('Signup', function ($scope, $http) {
  $scope.name = 'Signup';

}).
controller('Dashboard', function ($scope, $rootScope, FitbitData) {
  $scope.name = 'Dashboard';
  $scope.stats = function(data) { // callback function to retrieve async data from fitbit
    $scope.data = data; // save that data in the $scope for manipulatiion on tempaltes
  };
  $scope.getData = function() {
    FitbitData.retrieve($scope.stats); // FitbitData is a service that asyncs data from fitbit
  };
  $scope.submit = function() {
    FitbitData.update($scope.email);
    $scope.checkEmail();
  };
  $scope.email = 'email';
  $scope.checkEmail = function() {
    return $rootScope.user.email;
  }
}).
controller('ChartCtrl', function ($scope) {
  $scope.data = data; // FIXME: either nest the controllers on the template or use the FitbitData service here
});

// data variable to be set to data from the database.
// filled with dummy data for now.
var data = [
  {
    "key": "You",
    "values": [ [ 'Steps Taken' , 13468], [ 'Steps Goal' , 10000] ]
  },

  {
    "key": "Dummy Data",
    "values": [ [ 'Steps Taken' , 9876], [ 'Steps Goal' , 10000] ]
  }
]

