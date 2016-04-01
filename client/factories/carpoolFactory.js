app.factory('carpoolFactory', ['$http', function($http){
  cF = {};

  cF.index = function(callback){
    $http.get('/users').then(function(data){
      callback(data);
    });
  };

  cF.join = function(id, callback) {
    $http.put("/join/"+ id).then(function(data) {
      callback();
    });
  };

  cF.allow = function(id, callback) {
    $http.put("/allow/"+ id).then(function(data) {
      callback();
    });
  };

return cF;
}]);
