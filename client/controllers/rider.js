console.log("rider_CTRL");
app.controller("riderCtrl", ["$scope", "riderFactory", '$location', '$cookies', function($scope, rF, $loc, $cookies) {

  var rider = this;
  rider.currentUser = {
    id: $cookies.get('userid'),
    name: $cookies.get('username')
  }

  rider.index = function() {
    rF.index(function(res) {
      // console.log(res);
      rider.users = res;
    });
  };
  rider.update = function(){
    rF.update(rider, function(res){
      // console.log(res);
      rider.users = res;
      $loc.url('carpool')
    })
  }
  rider.index();
}]);
