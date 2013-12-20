angular.module('mean.dashboard')

.controller('DashboardCtrl', function  ($scope) {
  console.log('dash controller');
  $scope.name = 'dash';
});
console.log('dash module');