app.controller('carpoolCtrl', ['$scope', 'carpoolFactory', 'driverFactory', '$location', '$cookies', function($scope, cF, dF, $loc, $cookies){

  var carpool = this;

  carpool.index = function() {
    console.log("@ carpool controller");
    cF.index(function(data){
      carpool.users = data.data
      console.log(data.data);
    })
  }

carpool.index();


}])
