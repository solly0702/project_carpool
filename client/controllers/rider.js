console.log("rider_CTRL");
app.controller("riderCtrl", ["$scope", "riderFactory", '$location', '$cookies', '$routeParams', function($scope, rF, $loc, $cookies, $routeParams) {

  var rider = this;
  var id = $routeParams.id

  rider.currentUser = {
    id: $cookies.get('userid'),
    name: $cookies.get('username')
  };

  rider.index = function() {
    rF.index(function(res) {
      // console.log(res);
      rider.users = res;
    });
  };
  rider.update = function(){
    rF.update(rider, function(res){
      console.log(res);
      rider.users = res;
      $loc.url('carpool');
    });
  };

  rider.index();
  rider.get = function(){
    console.log("start rider.get ctlr", id);
    rF.get(id, function(res){
      rider.banana = res.data
      console.log(res.data);
    });
  };
  rider.get();
}]);
