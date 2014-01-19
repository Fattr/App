angular.module('fittr.controllers')

  .controller('SignupController', function($scope, $http) {
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
        $scope.signupLoginForm.$valid
    };

    $scope.submit = function() {
      console.log($scope.user);
      // send user's credentials to server

      // TODO: move to service
      var url = "http://localhost:3000/signup"   //ala Parse's api
      var futureResponse = $http.post(url, $scope.user); 

      futureResponse.success(function (data, status, headers, config) { 
        console.log(data);
        // TODO: investigate how to indicate to user that signup was successfull
        // TODO: investigate how to properly move from this state to connect devices state
        // - how about combining the two. indication of success is transition to 'connect devices'
        // state
      }); 
      futureResponse.error(function (data, status, headers, config) { 
        throw new Error(' Something went wrong...');
        // TODO: investigate how to indicate to user that signup was successfull
        // TODO: investigate how to properly move from this state to connect devices state
      });
    };
  });
