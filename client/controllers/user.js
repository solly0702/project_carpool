console.log("user_CTRL");

app.controller("userCtrl", ["$scope", "userFactory", "$location", function($scope, uF, $loc) {

  var user = this;

  user.create = function() {
      console.log(user);
    uF.create(user, function(res) {
      user.users = res;
      for (user in res) {
        if (user.status === true) {
          $loc.url("rider");
        } else {
          $loc.url("driver");
        }
      }
    });
  };

}]);
