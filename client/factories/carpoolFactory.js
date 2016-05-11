app.factory('carpoolFactory', ['$http', function($http){
  cF = {};

  cF.index = function(callback){
    $http.get('/carpool').then(function(res){
      callback(res);
    });
  };

  cF.delete = function(id, callback) {
    $http.delete("/carpool/" + id).then(function(res) {
      callback(res);
    });
  };

  cF.joins = function(id, callback){
    $http.get("/joins/"+ id).then(function(res){
      callback(res);
    });
  };

  cF.request = function(data, callback) {
    $http.post("/joins", data).then(function(res) {
      callback();
    });
  };

  cF.cancel = function(data, callback) {
    $http.patch("/joins", data)
    .then(function(res) {
      callback();
    });
  };

return cF;

}]);
