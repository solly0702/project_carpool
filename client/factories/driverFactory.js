console.log("driver_FR");
app.factory("driverFactory", ["$http", "$cookies",function($http, $cookies) {

  var dF = {};
  dF.get = function(id, callback){
    $http.get('/carpool/' + id)
    .then(function(res){
      callback(res);
    }).catch(function(err){
      console.log(err);
    });
  };

  dF.create = function(data, callback) {
    var carpool = {
      _user: data.currentUser.id,
      start_loc: data.start_loc,
      end_loc: data.end_loc,
      capacity: data.capacity,
      time_plan: data.time_plan,
      meeting_loc: data.meeting_loc
    };
    $http.post("/carpool", carpool)
    .then(function(res) {
      callback(res);
    }).catch(function(err) {
      console.log(err);
    });
  };

  dF.edit = function(id, data, callback){
    var carpool = {
      start_loc: data.start_loc,
      end_loc: data.end_loc,
      meeting_loc: data.meeting_loc,
      time_plan: data.time_plan,
      capacity: data.capacity
    };
    $http.patch('/editdriver/'+ id, carpool)
    .then(function(res){
      callback(res);
    }).catch(function(err){
      console.log(err);
    });
  };

  dF.allow = function(id, callback) {
    $http.patch("/joins/" + id)
    .then(function(res) {
      callback(res);
    }).catch(function(err) {
      console.log(err);
    });
  };

  return dF;
}]);
