angular.module('fittr.services')

.factory('AuthService', function($http, $q) {
  return {
    beginFbAuth: function() {
      var d = $q.defer();

      $http({
        method: 'GET',
        url: 'https://graph.facebook.com/santiago.archila'
      }).success(function(data, status) {
        d.resolve(data);
      }).error(function(data, status) {
        d.reject(status);
      });

      return d.promise;
    }
  };
});