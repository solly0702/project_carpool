console.log("user_FR");
app.factory("userFactory", ["$http", "$cookies", function($http, $cookies) {

  var uF = {};

  uF.create = function(data, callback) {
    console.log(data);
    $http.post("/login", data)
    .then(function(res) {
      $cookies.put("userid", res.data._id);
      $cookies.put("username", res.data.name);
      console.log($cookies.get('userid'));
      callback(res);
    }).catch(function(err) {
      console.log(err);
    });
  };
  return uF;
}]);
