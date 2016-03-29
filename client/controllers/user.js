console.log("user_CTRL");

app.controller("userCtrl", ["$scope", "userFactory", "$location", '$cookies', function($scope, uF, $loc, $cookies) {

  var user = this;
  var currentUser = {
    id: $cookies.get('userid'),
    name: $cookies.get('username')
  }
  user.create = function() {
      console.log(user);
    uF.create(user, function(res) {
      user.users = res;
      for (user in res) {
        if (res.status === false) {
          $loc.url("driver");
        } else {
          $loc.url("rider");
        }
      }
    });
  };

}]);
