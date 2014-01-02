'use strict';

/* Controllers */

angular.module('Fittr')
.controller('AppCtrl', function ($scope, $http) {
  $scope.name = 'Fittr';
}).
controller('Signup', function ($scope, $http) {
  $scope.name = 'Signup';
}).
controller('Dashboard', function ($scope, $rootScope, $http, FitbitData) {
  $scope.name = 'Dashboard';
  $scope.stats = function(data) { // callback function to retrieve async data from fitbit
    $scope.data = data; // save that data in the $scope for manipulatiion on tempaltes
  };
  $scope.getData = function() {
    FitbitData.retrieve($scope.stats); // FitbitData is a service that asyncs data from fitbit
  };
  // create a scope variable on the controller for refreshInterval (for polling)
  // $scope.refershInterval = 5;
  $scope.getAverage = function() {
    // AJAX call to query our database for data
    $http({method: 'GET', url: '/users/activity/2013-01-01'}).
    success(function(data) {
      $scope.averageCallback(data);
    })
  };
  $scope.submit = function() {
    FitbitData.update($scope.email);
    $scope.checkEmail();
  };
  $scope.email = 'email';
  $scope.checkEmail = function() {
    return $rootScope.user.email;
  };

  $scope.averageCallback = function(data) {
    var data = data;
    var stepSum = 0;
    for (var i = 0; i < data.length; i++){
      stepSum += data[i].steps;
    }
    var stepAvg = stepSum/data.length;
    console.log(stepAvg);
    $scope.chart = [
    {
      "key": "You",
      "values": [ [ 'Steps Taken' , 13468], [ 'Steps Goal' , 10000] ]
    },

    {
      "key": "Comparison Data",
      "values": [ [ 'Steps Taken' , stepAvg], [ 'Steps Goal' , 10000] ]
    }
    ];
  };
});