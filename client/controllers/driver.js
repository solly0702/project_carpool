console.log("driver_CTRL");
app.controller("driverCtrl", ["$scope", "driverFactory", "$location", "$cookies", "$routeParams" ,function($scope, dF, $loc, $cookies, $routeParams) {

  var driver = this;
  var id = $routeParams.id

  driver.currentUser = {
    id: $cookies.get("user_id"),
    name: $cookies.get("username")
  };

  driver.range = function (min, max) {
    var arr = [];
    for (var idx = min; idx < max; idx++) {
      arr.push(idx);
    }
    return arr;
  };

  driver.create = function() {
    dF.create(driver, function(res) {
      driver.drivers = res;
      console.log(driver.drivers);
      $loc.url("carpool");
    });
  };

  driver.get = function(){
    console.log("start driver.get ctlr", id);
    dF.get(id, function(res){
      driver.banana = res.data
      console.log(res.data);
    });
  };
  driver.get();
}]);
