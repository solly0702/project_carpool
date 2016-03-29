console.log("carpool_FR");
app.factory("carpoolFactory", ["$http", function($http) {
  var cF = {};

  cF.index = function(callback) {
    $http.get("/users").then(function(res) {
      callback(res.data);
    });
  };

  
  return cF;
}]);
