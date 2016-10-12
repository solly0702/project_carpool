app.factory("userFactory", ["$http", "$cookies", function($http, $cookies) {

  var uF = {};

  uF.create = function(data, callback) {
    $http.post("/login", data)
    .then(function(res) {
      $cookies.put("username", res.data.name);
      $cookies.put("user_id", res.data._id);
      $cookies.put('status', res.data.status);
      $cookies.put("group_size", res.data.group_size);
      callback(res);
    }).catch(function(err) {
      console.log(err);
    });
  };

  uF.logout = function(){
    var cookies= $cookies.getAll();
    angular.forEach(cookies, function(v, k) {
      $cookies.remove(k);
    });
  };

  uF.status = function() {
    if ($cookies.get("user_id")) {
      return true;
    } else {
      return false;
    }
  };

  return uF;
}]);
