angular.module('fittr.services')

/**
 * A simple example service that returns some data.
 */
.factory('DeviceService', function() {
  // Some fake testing data
  devices = [
      {
        deviceName: "FitBit",
        imgUrl: "img/fitbit_logos/1024x1024/png/fitbit-1024-blk-transparent.png",
        apiUrl: ""
      },
      {
        deviceName: "Jawbone Up",
        imgUrl: "img/Jawbone_logo_black.png",
        apiUrl: ""
      },
      {
        deviceName: "Moves",
        imgUrl: "img/moves_logo.png",
        apiUrl: ""
      },
      {
        deviceName: "Runkeeper",
        imgUrl: "img/rk-icon.png",
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
