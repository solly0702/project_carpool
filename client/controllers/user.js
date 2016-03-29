console.log("user_CTRL");

app.controller("userCtrl", ["$scope", "userFactory", "$location", function($scope, uF, $loc) {

  var user = this;

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
