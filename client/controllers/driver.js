app.controller("driverCtrl", ["$scope", "driverFactory", "$location", "$cookies", "$routeParams", "Flash", function($scope, dF, $loc, $cookies, $routeParams, Flash) {

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

  driver.create = function() {
    if (new Date(driver.time_plan) < new Date()) {
      Flash.create("danger", driver.time_plan + " must be in future from now");
    }
    else {
      dF.create(driver, function(res) {
        driver.driver = res;
        $loc.url("carpool");
      });
    }
  };

  driver.get = function(id){
    if ($routeParams.id) {
      dF.get($routeParams.id, function(res){
        driver.driver = res.data;
        driver.capacity = driver.driver.capacity;
      });
    }
  };

  driver.edit = function(pool_id){
    if (new Date(driver.time_plan) < new Date()) {
      Flash.create("danger", driver.time_plan + " must be in future from now");
    }
    else {
      dF.edit(pool_id, driver, function(res){
        driver.driver = res;
        $loc.url('carpool');
      });
    }
  };

  driver.get();

}]);
