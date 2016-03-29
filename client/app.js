console.log("angular_module&routes");
var app = angular.module("app", ["ngRoute", "ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider
  .when("/index", {
    templateUrl: "partials/intro.html",
    controller: "userCtrl",
    controllerAs: "user"
  })
  .when('/rider', {
    templateUrl: 'partials/rider.html',
    controller: 'riderCtrl',
    controllerAs: "rider"
  })
  .when('/driver', {
    templateUrl: 'partials/driver.html',
    controller: 'driverCtrl',
    controllerAs: "driver"
  })
  .when('/carpool', {
    templateUrl: "partials/carpool.html",
    controller: "carpoolCtrl",
    controllerAs: "carpool"
  })
  .otherwise({
    redirectTo: "/index"
  });
}]);
