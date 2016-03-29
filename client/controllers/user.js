console.log("user_CTRL");

app.controller("userCtrl", ["$scope", "userFactory", "$location", function($scope, uF, $loc) {

  var user = this;

  user.create = function() {
    uF.create(user, function(res) {
      console.log(res);
      user.users = res;
      if (res.status === false) {
        $loc.url("driver");
      } else {
        $loc.url("rider");
      }
    });
  };

}]);
