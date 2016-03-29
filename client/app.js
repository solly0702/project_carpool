console.log("angular_module&routes");
var app = angular.module("app", ["ngRoute", "ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
  .when("/index", {
    templateUrl: "partials/intro.html",
    controller: "userCtrl",
    controllerAs: "user"
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'carpoolCtrl',
    controllerAs: "carpool"
  })
  .otherwise({
    redirectTo: "/index"
  });
}]);
