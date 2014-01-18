angular.module('fittr.controllers')

.controller('MainController', function($scope) {
  var users = [
    'David',
    'Santiago',
    'Scott',
    'Wayne',
    'Mehul',
    'Eric',
    'Sam',
    'Sara',
    'Joao',
    'Mike',
    'Nick',
    'Anne'
  ];

  $scope.users = users;

  $scope.cardVis = true;

  $scope.cardToggle = function() {
    $scope.cardVis = !$scope.cardVis;
  };
});