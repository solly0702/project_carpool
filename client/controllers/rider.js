console.log("rider_CTRL");
app.controller("riderCtrl", ["$scope", "riderFactory", function($scope, rF) {

  var rider = this;

  rider.index = function() {
    rF.index(function(res) {
      console.log(res);
      rider.users = res;
    });
  };

  rider.index();
}]);
