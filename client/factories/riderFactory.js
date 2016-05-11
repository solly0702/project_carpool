console.log("rider_FR");
app.factory("riderFactory", ["$http", '$cookies', function($http, $cookies) {

  var rF = {};


  rF.update = function(data, callback) {
    $http.put('/users/'+ data.currentUser.id, data).then(function(res){
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
    $http.put('/editrider/'+ id, data)
    .then(function(res){
      callback(res);
    }).catch(function(err){
      console.log(err);
    });
  };

  return rF;
}]);
