app.controller('carpoolCtrl', ['$scope', 'carpoolFactory', 'driverFactory', '$location', '$cookies', '$routeParams', function($scope, cF, dF, $loc, $cookies, $routeParams){

  var carpool = this;
  var id = $routeParams.id;

  carpool.currentUser = {
    id: $cookies.get('user_id'),
    name: $cookies.get('username'),
    status: $cookies.get('status')
  };
  carpool.index = function() {
    cF.index(function(data){
      carpool.users = data.data;
    });
  };

  carpool.join = function(user_id){
    console.log(user_id);
    cF.join(user_id, carpool.index);
  };

  carpool.allow = function(user_id){
    cF.join(user_id, carpool.index);
  };

  carpool.index();



}])
