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

  var userObjs = [];

  users.forEach(function(user) {
    var obj = {
      name: user,
      display: true
    };

    userObjs.push(obj);
  });

  $scope.users = userObjs;

  $scope.cardToggle = function() {
    $scope.this.diplay = !this.display;
  };
});