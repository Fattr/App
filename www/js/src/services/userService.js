angular.module('fittr.services')

.provider('UserService', function() {
  var baseUrl = "http://localhost:3000/signup";
  var apiKey = '';

  // Set our API key from the .config section
  // of our app
  this.setApiKey = function(key) {
    apiKey = key || apiKey;
  };


  this.$get = function($http, $q, localStorageService) {
    return {
      signup: function(user) {
        console.log(user, apiKey);
        var creatingUser = $q.defer();
        
        // configure http to send app access token along with POST
        $http.defaults.headers.post.apikey = apiKey;
        $http.post(baseUrl, user)
          .success(function(data, status, headers, config) {
            console.log("data: ", data, "status: ", status);
            creatingUser.resolve(data);
            // TODO: investigate how to indicate to user that signup was successfull
            // TODO: investigate how to properly move from this state to connect devices state
            // - how about combining the two. indication of success is transition to 'connect devices'
            // state    
            // this.setUser(data);   
            
          })
          .error(function(data, status, headers, config) {
            creatingUser.reject(data, status);
          // TODO: investigate how to indicate to user that signup was successfull
          // TODO: investigate how to properly move from this state to connect devices state
          });

        return creatingUser.promise;
      },
      save: function(userId, data) {
        console.log("saving user into localStorage");
        // localStorageService.add('users', data);
      }
    };
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