console.log("rider_FR");
app.factory("riderFactory", ["$http", '$cookies', function($http, $cookies) {

  var rF = {};
  currentUser = {
    id: $cookies.get('user_id'),
    name: $cookies.get('username')
  };

  rF.index = function(callback) {
    $http.get("/users").then(function(res) {
      callback(res.data);
    });
  };
  rF.update = function(rider, callback) {
    console.log($cookies.get('user_id'));
    console.log(rider);
    $http.put('/users/'+ currentUser.id, rider).then(function(res){
      // console.log('made it back to rF update');
      callback(res);
    });
  };
  rF.get = function(data, callback){
    console.log('start driver.get factory', data);
    $http.get('/rider/' + data)
    .then(function(res){
      console.log('&&&&&&&&&&&&&&&&&&&', res);
      callback(res);
    }).catch(function(err){
      console.log(err);
    });
  };
  return rF;
}]);
