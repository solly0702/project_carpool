console.log("carpool_CTRL");
app.controller("carpoolCtrl", ["$scope", "carpoolFactory", function($scope, cF) {

  var carpool = this;

  carpool.index = function() {
    cF.index(function(res) {
      carpool.users = res;
    });
  };

  carpool.index();
}]);
