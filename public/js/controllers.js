'use strict';

/* Controllers */

angular.module('Fittr')
  .controller('AppCtrl', function ($scope, $http) {
    $scope.name = 'Fittr';
  }).
  controller('Signup', function ($scope) {
    $scope.name = 'Signup';

  }).
  controller('Dashboard', function ($scope) {
    $scope.name = 'Dash';
  });
