angular.module('fittr.controllers')

.controller('CardController', function($scope) {
  $scope.visib = true;

  $scope.cardToggle = function() {
    $scope.visib = !$scope.visib;
  };
});