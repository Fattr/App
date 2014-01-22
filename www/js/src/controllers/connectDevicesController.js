angular.module('fittr.controllers')

  .controller('ConnectDevicesController', function($scope, DeviceService) {
    // TODO: move devices to a service
    $scope.devices = DeviceService.all();

    $scope.connectFitBit = function() {
      OAuth.initialize('3xTGDgM-_y94I7n-9QQFTuycM-0');

      // Oauth.redirect('fitbit', {authorize:{display:"touch"}}, '/connect-devices');

      // OAuth.callback('fitbit', function(err, result) {
      //   if (err) {
      //     console.log(err); // do something with error
      //     return;
      //   }
      //   console.log(result);
      // });
      OAuth.popup('fitbit', {authorize:{display:"touch"}}, function(error, result) { 
        if (error) {
          console.log(error);
          return;
        }
        console.log(result);
      });
    };
  });
