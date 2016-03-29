console.log("driver_FR");
app.factory("driverFactory", ["$http", "$cookies",function($http, $cookies) {

  var dF = {};

  dF.create = function(data, callback) {
    console.log("@@driver factory");
    var carpool = {
      _user: data.currentUser.id,
      start_loc: data.start_loc,
      end_loc: data.end_loc,
      capacity: data.capacity,
      time_plna: data.time_plan,
      meeting_loc: data.meeting_loc
    };
    $http.post("/carpool", carpool)
    .then(function(res) {
      callback(res);
    }).catch(function(err) {
      console.log(err);
    });
  };

  return dF;
}]);
