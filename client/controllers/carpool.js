app.controller('carpoolCtrl', ['$scope', 'carpoolFactory', 'driverFactory', '$location', '$cookies', '$routeParams', function($scope, cF, dF, $loc, $cookies, $routeParams){

  var carpool = this;


  carpool.currentUser = {
    id: $cookies.get('user_id'),
    name: $cookies.get('username'),
    status: $cookies.get('status'),
    size: $cookies.get("group_size")
  };

  carpool.delete = function(id) {
    cF.delete(id, carpool.index);
  };

  carpool.joins = function(id) {
    cF.joins(id, function(data){
      carpool.join_db = data.data;
    });
  };

  carpool.request = function(carpool_id){
    var data = {
      user: carpool.currentUser.id,
      carpool: carpool_id,
      size: carpool.currentUser.size,
    };
    cF.request(data, carpool.index);
  };

  carpool.cancel = function(carpool_id, join_id) {
    var data = {
      join: join_id,
      carpool: carpool_id,
      size: carpool.currentUser.size,
      user : carpool.currentUser.id
    };
    cF.cancel(data, carpool.index);
  };

  carpool.index = function() {
    cF.index(function(data){
      carpool.pool = data.data;
    });
    carpool.joins(carpool.currentUser.id);
  };

  carpool.index();
}]);
