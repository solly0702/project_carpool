console.log("user_CTRL");
app.controller("userCtrl", ["$scope", "userFactory", "$location", '$cookies', function($scope, uF, $loc, $cookies) {

  var user = this;
  user.index = function(){
    $cookies.remove('userid'),
    $cookies.remove('username')
  }
  user.index();

  user.create = function() {
    uF.create(user, function(res) {
      user.users = res;
      console.log(user.users);
      if (user.users.data.status === false) {
        $loc.url("driver");
      } else {
        $loc.url("rider");
      }
    });
  };
}]);
