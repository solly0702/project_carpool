console.log("rider_FR");
app.factory("riderFactory", ["$http", function($http) {

  var rF = {};

  rF.index = function(callback) {
    $http.get("/users").then(function(res) {
      callback(res.data);
    });
  };


  return rF;
}]);
