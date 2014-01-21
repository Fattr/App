angular.module('fittr.services')

/**
 * A simple example service that returns some data.
 */
.factory('DeviceService', function() {
  // Some fake testing data
  devices = [
      {
        deviceName: "FitBit",
        imgUrl: "img/ionic.png",
        apiUrl: ""
      },
      {
        deviceName: "Jawbone Up",
        imgUrl: "img/ionic.png",
        apiUrl: ""
      },
      {
        deviceName: "Moves",
        imgUrl: "img/ionic.png",
        apiUrl: ""
      },
      {
        deviceName: "Runkeeper",
        imgUrl: "img/ionic.png",
        apiUrl: ""
      }
    ];
  
  return {
    all: function() {
      return devices;
    },
    get: function(deviceId) {
      // Simple index lookup
      return devices[deviceId];
    }
  };
});
