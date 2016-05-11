app.controller("riderCtrl", ["$scope", "riderFactory", '$location', '$cookies', "Flash", function($scope, rF, $loc, $cookies, Flash) {

  var rider = this;

  rider.currentUser = {
    id: $cookies.get('user_id'),
    name: $cookies.get('username')
  };

  rider.range = function (min, max) {
    var arr = [];
    for (var idx = min; idx < max; idx++) {
      arr.push(idx);
    }
    return arr;
  };

  rider.update = function(){
    if (new Date(rider.time) < new Date()) {
      Flash.create("danger", rider.time + " must be in future from now");
    }
    else {
      rF.update(rider, function(res){
        $cookies.put("group_size", res.data.group_size);
        $loc.url('carpool');
      });
    }
  };

  rider.edit = function(rider){
    rF.edit(id, rider, function(res){
      rider.users = res;
      $loc.url('rider/'+id);
    });
  };

  rider.get = function(){
    rF.get(rider.currentUser.id, function(res){
      rider.user = res.data;
    });
  };

  rider.get();
}]);
