var app = angular.module("app", ["ngRoute", "ngCookies", "angularjs-datetime-picker","ngFlash", "uiGmapgoogle-maps"]).constant("_", _);

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

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/intro.html',
    controller: 'userCtrl',
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
    controller: 'driverInfoCtrl',
    controllerAs: 'driver'
  })
  .when('/editdriver/:id', {
    templateUrl: "partials/editdriver.html",
    controller: 'driverCtrl',
    controllerAs: 'driver'
  })
  .when('/rider/:id', {
    templateUrl: "partials/riderinfo.html",
    controller: 'riderCtrl',
    controllerAs: 'rider'
  })
  .when('/editrider/:id', {
    templateUrl: "partials/editrider.html",
    controller: 'riderCtrl',
    controllerAs: 'rider'
  })
  .when('/logout', {
    templateUrl: 'partials/intro.html',
    controller: 'userCtrl',
    controllerAs: "user"
  })
  .otherwise({
    templateUrl: "partials/errors/404.html",
  });

  // $locationProvider.html5Mode(true);
}]);
