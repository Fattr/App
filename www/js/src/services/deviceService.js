angular.module('fittr.services')

/**
 * A simple example service that returns some data.
 */
.factory('DeviceService', function() {
  // Some fake testing data
  devices = [
      {
        deviceName: "FitBit",
        imgUrl: "../img/js_logo.jpeg",
        apiUrl: ""
      },
      {
        deviceName: "Jawbone Up",
        imgUrl: "../img/js_logo.jpeg",
        apiUrl: ""
      },
      {
        deviceName: "Moves",
        imgUrl: "../img/js_logo.jpeg",
        apiUrl: ""
      },
      {
        deviceName: "Runkeeper",
        imgUrl: "../img/js_logo.jpeg",
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
