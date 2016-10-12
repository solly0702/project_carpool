app.controller("userCtrl", ["$scope", "userFactory", "$location", '$cookies', function($scope, uF, $loc, $cookies) {

  var user = this;

  user.create = function() {
    uF.create(user, function(res) {
      user.users = res;
      if (user.users.data.status === false) {
        $loc.url("carpool");
      } else {
        $loc.url("rider");
      }
    });
  };

  user.logout = function() {
    uF.logout();
  };

  user.status = function() {
    if (uF.status) {
      user.loginStatus = uF.status();
    }
  };

  user.status();

}]);
