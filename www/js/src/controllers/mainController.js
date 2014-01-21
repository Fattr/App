angular.module('fittr.controllers')

.controller('MainController', function($scope) {

  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };

});