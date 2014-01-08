'use strict';

/* Controllers */

angular.module('Fittr')
.controller('AppCtrl', function ($scope, $http) {
  $scope.name = 'Fittr';
})
.controller('Signup', function ($scope, $http) {
  $scope.name = 'Signup';
})
.controller('Dashboard', function ($scope, $rootScope, $http, FitbitData) {
  $scope.name = 'Dashboard';
  $scope.stats = function(data) { // callback function to retrieve async data from fitbit
    $scope.data = data; // save that data in the $scope for manipulatiion on tempaltes
  };
  $scope.getData = function() {
    FitbitData.retrieve($scope.myDates, $scope.stats); // FitbitData is a service that asyncs data from fitbit
  };
  $scope.submit = function() {
    FitbitData.update($scope.email);
    $scope.checkEmail();
  };
  $scope.email = 'email';
  $scope.checkEmail = function() {
    return $rootScope.user.email;
  };
  //==========================================
  //  callback function to print chart from
  //  async data from the db.
  //==========================================
  $scope.averageCallback = function(data) {
    console.log('data', data);
    var stepSum = 0;
    var calSum = 0;
    for (var i = 0; i < data.length; i++){
      stepSum += data[i].steps;
      calSum += data[i].caloriesOut;
    }
    var stepAvg = stepSum/data.length;
    var calAvg = calSum/data.length;
    console.log('average steps - ', stepAvg);
    console.log('average calories burned - ', calAvg);
    $scope.stepsChart = [
      {
        "key": "You",
        "values": [ [ 'Steps Taken' , 13468], [ 'Steps Goal' , 10000] ]
      },
      {
        "key": "Comparison Data",
        "values": [ [ 'Steps Taken' , stepAvg], [ 'Steps Goal' , 10000] ]
      }
    ];
    $scope.caloriesChart = [
      {
        "key": "You",
        "values": [ [ 'Calories Burned Today' , 12345], [ 'Calories Goal' , 10000] ]
      },
      {
        "key": "Comparison Data",
        "values": [ [ 'Avg Calories Burned' , calAvg], [ 'Some Other Shit' , 10000] ]
      }
    ];
    // TODO: Sleep chart shit in worker.js (Time permitting).
    // $scope.sleepChart = [
    //   {
    //     "key": "You",
    //     "values": [ [ 'Minutes Sleeping' , 12345], [ 'Minutes Awake' , 10000] ]
    //   },
    //   {
    //     "key": "Comparison Data",
    //     "values": [ [ 'Avg Minutes Sleeping' , 12345], [ 'Average Minutes Awake' , 10000] ]
    //   }
    // ];
  };
  $scope.getAverage = function() {
    FitbitData.getData($scope.myDates, $scope.averageCallback); // AverageSteps is a factory fn found in services.js
  };
  $scope.dateOptions = {
    changeYear: true,
    changeMonth: true,
    yearRange: '2010:-0'
  };
  $scope.myDates; //the datepicker stores the dates as {'from':'someDate', 'to':'someDate'}
});