console.log("driver_CTRL");
app.controller("driverCtrl", ["$scope", "driverFactory", "$location", "$cookies" ,function($scope, dF, $loc, $cookies) {

  var driver = this;

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

  driver.create=function() {
    dF.create(driver, function(res) {
      driver.drivers = res;
      console.log(driver.drivers);
      $loc.url("carpool");
    });
  };

}]);
