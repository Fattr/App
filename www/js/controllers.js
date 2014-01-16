angular.module('fittr.controllers', [])

.controller('EntryController', function($http, $scope) {
  $scope.fbAuth = function() {
    $http({
      method: 'GET',
      url: 'https://api.parse.com/1/classes/tweets'
    }).success(function(data, status, headers, config) {
      console.log('status:', status);
    }).error(function(data, status, headers, config) {
      console.log('status:', status);
    });
  };
})

// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
