console.log("angular_module&routes");
var app = angular.module("app", ["ngRoute", "ngCookies","uiGmapgoogle-maps"]);

app.config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
  GoogleMapApiProviders.configure({
    transport:"https",
    china: true,
    key: 'AIzaSyBnl_31W6ULJ0-swV526yBsbdCA1J5M5F4',
    v: '3.23', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization',
    preventLoad: false
  });
}]);

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
  .when('/driver/:id', {
    templateUrl: "partials/driverinfo.html",
    controller: 'driverCtrl',
    controllerAs: 'driver'
  })
  .when('/rider/:id', {
    templateUrl: "partials/riderinfo.html",
    controller: 'riderCtrl',
    controllerAs: 'rider'
  })
  .otherwise({
    redirectTo: "/index"
  });
}]);
