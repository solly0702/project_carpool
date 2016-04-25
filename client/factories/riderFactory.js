console.log("rider_FR");
app.factory("riderFactory", ["$http", '$cookies', function($http, $cookies) {

  var rF = {};
  currentUser = {
    id: $cookies.get('user_id'),
    name: $cookies.get('username')
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
    $http.get('/rider/' + data)
    .then(function(res){
      callback(res);
    }).catch(function(err){
      console.log(err);
    });
  };
  rF.edit = function(id, data, callback){
    console.log("@@ rider factory edit");
    $http.put('/editrider/'+ id, data)
    .then(function(res){
      console.log(res, "made back to edit factory");
      callback(res);
    }).catch(function(err){
      console.log(err);
    });
  };
  return rF;
}]);
