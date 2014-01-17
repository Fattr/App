angular.module('fittr.controllers')

.controller('EntryController', function($scope, AuthService) {
  $scope.fbAuth = function() {
    var promise = AuthService.beginFbAuth();
      console.log(promise);
    // AuthService.beginFbAuth().then(function(data) {
    //   console.log('data', data);
    // });
  };
});
