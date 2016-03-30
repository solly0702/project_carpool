console.log("rider_FR");
app.factory("riderFactory", ["$http", '$cookies', function($http, $cookies) {

  var rF = {};
  currentUser = {
    id: $cookies.get('userid'),
    name: $cookies.get('username')
  };

  rF.index = function(callback) {
    $http.get("/users").then(function(res) {
      callback(res.data);
    });
  };
  rF.update = function(rider, callback) {
    // console.log('start rF update');
    console.log(rider);
    $http.put('/users/'+ currentUser.id, rider).then(function(res){
      // console.log('made it back to rF update');
      callback(res);
    });
  };

  return rF;
}]);
