console.log("driver_CTRL");

app.controller("driverCtrl", ["$scope", "driverFactory", "$location", "$cookies", "$routeParams", "uiGmapGoogleMapApi",function($scope, dF, $loc, $cookies, $routeParams,uiGmapGoogleMapApi) {


  var driver = this;
  var id = $routeParams.id;
  var loc = {
    "start_loc": "",
    "end_loc": "",
    "meeting_loc": ""
  };

  var index = 0;
  driver.markerList = [];

  driver.currentUser = {
    id: $cookies.get("user_id"),
    name: $cookies.get("username")
  };

  driver.range = function (min, max) {
    var arr = [];
    for (var idx = min; idx < max; idx++) {
      arr.push(idx);
    }
    return arr;
  };

  driver.get = function(){
    dF.get(id, function(res){
      loc.start_loc = res.data._carpool.start_loc;
      loc.end_loc = res.data._carpool.end_loc;
      loc.meeting_loc = res.data._carpool.meeting_loc;
      driver.banana = res.data;
    });
  };

  driver.create = function() {
    dF.create(driver, function(res) {
      driver.drivers = res;
      $loc.url("carpool");
    });
  };

  driver.map = function() {
    uiGmapGoogleMapApi.then(function(map) {
      driver.map = {
        center: {
          latitude: 47.609632,
          longitude: -122.19687
        },
        zoom: 13,
        bounds: {}
      };

      driver.marker = {
        id: index++,
        coords: {
          latitude: "",
          longitude: ""
        }
      };
    });
  };

  driver.map();

  driver.code = function(loc,map, callback) {
    for (let el in loc) {
      console.log(el);
        geocoder = new map.Geocoder();
          geocoder.geocode({"address": loc[el]}, function(res, status)  {
          if(status === map.GeocoderStatus.OK) {
            var coords = {
              city: loc[el],
              latitude: res[0].geometry.location.lat(),
              longitude: res[0].geometry.location.lng()
            };
            console.log(coords);
            driver.markerList.push({
              id: index++,
              coords: coords
            });
            console.log(driver.markerList);
            callback(driver.markerList);
          }
        });
    }
  };

  driver.geocoder = function() {
    uiGmapGoogleMapApi.then(function(map) {
      driver.code(loc, map, function(markerList){
        console.log(markerList);
      });

    });
  };

  driver.get();
  driver.geocoder();

}]);
