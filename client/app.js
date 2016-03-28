console.log('at app.js');
var app = angular.module('app', ['ngRoute', 'ngCookies'])
.config(function($routeProvider){
  $routProvider
    .when('/',{
      templateUrl: 'partials/intro.html',
      controller: 'userController'
    })

    .when('/home',{
      templateUrl: 'partials/home.html',
      controller: 'carpoolController'
    })


})
