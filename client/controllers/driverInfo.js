app.controller("driverInfoCtrl", ["$scope", "$timeout", "driverFactory", "$location", "$cookies", "$routeParams", "uiGmapGoogleMapApi","uiGmapIsReady",function($scope, $timeout, dF, $loc, $cookies, $routeParams,uiGmapGoogleMapApi,uiGmapIsReady) {

  var driver = this;
  var id = $routeParams.id;
  var loc = {
    "start_loc": "",
    "end_loc": "",
    "meeting_loc": ""
  };
  var index = 0;
  driver.markerList = [];

  var driver_id = $routeParams.id;

  driver.currentUser = {
    id: $cookies.get("user_id"),
    name: $cookies.get("username")
  };

  driver.get = function(){
    dF.get(driver_id, function(res){
      loc.start_loc = res.data.start_loc;
      loc.end_loc = res.data.end_loc;
      loc.meeting_loc = res.data.meeting_loc;
      driver.driver = res.data;
    });
  };

  driver.allow = function(join_id) {
    dF.allow(join_id, driver.get);
  };

  driver.showMap = function() {
    $timeout(function() {
      uiGmapGoogleMapApi.then(function(map) {
        driver.map = {
          center: {
            latitude: 47.609632,
            longitude: -122.19687
          },
          zoom: 10,
          bounds: {}
        };
        driver.marker = {
          id: index++,
          coords: {
            latitude: "",
            longitude: ""
          }
        };
      })
    },500)
  }

  driver.code = function(loc,map,callback) {
    for (let el in loc) {
      geocoder = new map.Geocoder();
        geocoder.geocode({"address": loc[el]}, function(res, status)  {
          if(status === map.GeocoderStatus.OK) {
            var coords = {
              latitude: res[0].geometry.location.lat(),
              longitude: res[0].geometry.location.lng()
            };
            driver.markerList.push({
              id: index++,
              city: loc[el],
              coords: coords
          });
          callback(driver.markerList);
        }
      });
    }
  };

  driver.geocoder = function() {
    uiGmapGoogleMapApi.then(function(map) {
      driver.code(loc, map, function(markerList){
      });
    });
  };

  driver.get();


  uiGmapIsReady.promise()
  .then(driver.geocoder())
  .then(driver.showMap())
  .catch(function(err) {
    console.log(err);
  });

}]);
