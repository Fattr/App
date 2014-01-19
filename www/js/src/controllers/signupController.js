angular.module('fittr.controllers')

  .controller('SignupController', function($scope, $http, UserService) {
    $scope.title = "Sign Up";
    $scope.user = {};


    $scope.getCssClasses = function(ngModelContoller) {
      return {
        error: ngModelContoller.$invalid && ngModelContoller.$dirty,
        success: ngModelContoller.$valid && ngModelContoller.$dirty
      };
    };
  
    $scope.showError = function(ngModelController, error) {
      return ngModelController.$error[error];
    };

    $scope.canSubmit = function() {
      return $scope.signupLoginForm.$dirty &&
        $scope.signupLoginForm.$valid;
    };

    $scope.submit = function() {
      $scope.user.username = $scope.user.email;
      UserService.signup($scope.user)
        .then(function(data) {
          // store user details in local storage?
          console.log(data);
        });
    };
  });


// When the creation is successful, the HTTP response is a 201 Created and the Location header contains the URL for the new user:

// Status: 201 Created
// Location: https://api.parse.com/1/users/g7y9tkhB7O
// The response body is a JSON object containing the objectId, the createdAt timestamp of the newly-created object, and the sessionToken which can be used to authenticate subsequent requests as this user:

// {
//   "createdAt": "2011-11-07T20:58:34.448Z",
//   "objectId": "g7y9tkhB7O",
//   "sessionToken": "pnktnjyb996sj4p156gjtp4im"
// }
