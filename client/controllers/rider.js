console.log("rider_CTRL");
app.controller("riderCtrl", ["$scope", "riderFactory", '$location', '$cookies', '$routeParams', function($scope, rF, $loc, $cookies, $routeParams) {

  var rider = this;


  rider.currentUser = {
    id: $cookies.get('user_id'),
    name: $cookies.get('username')
  };

  rider.update = function(){
    rF.update(rider, function(res){
      console.log(res);
      rider.users = res;
      $loc.url('carpool');
    });
  };

  rider.edit = function(rider){
    console.log('start rider.edit ctlr', id);
    rF.edit(id, rider, function(res){
      console.log(res);
      rider.users = res
      $loc.url('rider/'+id)
    })
  };

  rider.get = function(){
    rF.get(rider.currentUser.id, function(res){
      rider.users = res.data
      console.log(res.data);

    });
  };
  rider.get();
}]);
