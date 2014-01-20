angular.module('fittr.controllers')

  .controller('ConnectDevicesController', function($scope, DeviceService) {
    // TODO: move devices to a service
    $scope.devices = DeviceService.all();
  });
