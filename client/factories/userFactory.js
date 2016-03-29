console.log("user_FR");
app.factory("userFactory", ["$http", "$cookies", function($http, $cookies) {

  var uF = {};

  uF.index = function(callback) {
    $http.get("/users").then(function(res) {
      callback(res.data);
    });
  };

  uF.create = function(data, callback) {
    console.log(data);
    $http.post("/login", data)
    .then(function(res) {
      $cookies.put("userdata", res.data);
      callback(res);
    }).catch(function(err) {
      console.log(err);
    });
  };
  return uF;
}]);
