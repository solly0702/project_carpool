app.controller('carpoolCtrl', ['$scope', 'carpoolFactory', 'driverFactory', '$location', '$cookies', '$routeParams', function($scope, cF, dF, $loc, $cookies, $routeParams){

  var carpool = this;
  var id = $routeParams.id

  carpool.currentUser = {
    id: $cookies.get('user_id'),
    name: $cookies.get('username'),
    status: $cookies.get('status')
  }
  carpool.index = function() {
    console.log("@ carpool controller");
    cF.index(function(data){
      carpool.users = data.data
      // console.log(data.data);
    })
  }
  carpool.join = function(){
    cF.join(carpool.currentUser.id, function(){

    })
  }
  carpool.index();

  // carpool.get = function(id){
  //   console.log("start carpool.get ctlr",id);
  //   dF.get(id, function(res){
  //     carpool.banana = res.data
  //     console.log(res.data);
  //   })
  // }
  // carpool.get()

}])
