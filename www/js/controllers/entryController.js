angular.module('fittr.controllers')

.controller('EntryController', function($scope, AuthService) {
  $scope.fbAuth = function() {
    AuthService.beginFbAuth().then(function(data) {
      console.log('data', data);
    });
  };
});
