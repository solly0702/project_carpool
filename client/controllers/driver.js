console.log("driver_CTRL");

app.controller("driverCtrl", ["$scope", "driverFactory", "$location", "$cookies", "$routeParams", "uiGmapGoogleMapApi",function($scope, dF, $loc, $cookies, $routeParams,uiGmapGoogleMapApi) {


  var driver = this;
  var id = $routeParams.id;

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
      $loc.url("carpool");
    });
  };



}]);
