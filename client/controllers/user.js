console.log("user_CTRL");

app.controller("userCtrl", ["$scope", "userFactory", "$location", function($scope, uF, $loc) {

  var user = this;

  user.index = function() {
    uF.index(function(res) {
      user.users = res;
    });
  };

  user.create = function() {
      console.log(user);
    uF.create(user, function(res) {
      user.users = res;
      $loc.url("home");
    });
  };

  user.index();
}]);
