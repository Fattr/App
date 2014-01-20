angular.module('fittr.controllers')

  .controller('SignupController', function($scope, $http, UserService, $state) {

    var resetForm = function(ngFormController) {
      $scope.user.email = "";
      $scope.user.password = "";
      ngFormController.$setPristine();
    };

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

    $scope.signup = function(ngFormController) {
      $scope.user.username = $scope.user.email;
      UserService.signup($scope.user)
        .then(function(data) {
          console.log(data);
          // clear form
          resetForm(ngFormController);
          // store user details in local storage?
          UserService.save(data);
          // move to connect devices state
          $state.go('connect-devices');
        }, function(reason) {
          resetForm(ngFormController);
          console.log("reason: ", reason);
        });
    };
  });



