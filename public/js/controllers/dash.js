angular.module('mean.dashboard')

.factory('fitbit', function($http, $location) {
  var service = {
    auth: function() {
      $http({
        method: "GET",
        url: 'http://127.0.0.1:8553'
      }).then(function(data) {
        window.location = data.data;
      });
    },
    getData: function() {
      $http({
        method: "GET",
        url: "http://127.0.0.1:8553/getStuff"
      }).then(function(data) {
        console.log('angular',data);
      });
    }
  };
  return service;
})

.controller('DashboardCtrl', function  ($scope, fitbit) {
  $scope.name = 'dash';
  $scope.auth = function() {
    fitbit.auth();
  };
  $scope.getData = function(){
    fitbit.getData();
  };
});