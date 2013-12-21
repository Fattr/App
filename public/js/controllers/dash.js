angular.module('mean.dashboard')

.factory('fitbit', function($http, $location) {
  var services = {
    auth: function() {
      console.log('called');
      $http({
        method: 'GET',
        url: 'http://127.0.0.1:8000/auth/fitbit'
      }).then(function(result) {
        window.location = result.data;
      });
    }
  };
  return services;
})
.controller('DashboardCtrl', function  ($scope, fitbit) {
  $scope.name = 'dash';
  $scope.auth = function() {
    fitbit.auth();
  }
});
