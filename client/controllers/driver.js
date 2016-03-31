console.log("driver_CTRL");
app.controller("driverCtrl", ["$scope", "driverFactory", "$location", "$cookies", "$routeParams", "uiGmapGoogleMapApi", function($scope, dF, $loc, $cookies, $routeParams, uiGmapGoogleMapApi) {


  var driver = this;
  var id = $routeParams.id

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

  driver.create = function() {
    dF.create(driver, function(res) {
      driver.drivers = res;
      $loc.url('carpool')
    });
  };
  driver.get = function(){
    // console.log("start driver.get ctlr", id);
    dF.get(id, function(res){
      driver.banana = res.data;
      // console.log(res.data);
    });
  };

  driver.edit = function(driver){
    console.log('start driver.edit ctlr', id);
    dF.edit(id, driver, function(res){
      console.log(res);
      $loc.url('carpool')
    })
  };
  console.log('banana');
  driver.map = function() {
    uiGmapGoogleMapApi.then(function(map) {
      console.log(map);
      driver.map = {
        center: {
          latitude: 47.609632,
          longitude: -122.19687
        },
        zoom: 13,
      };
      driver.marker = {
        id: 0,
        coords: {
          latitude: "",
          longitude: ""
        }
      };
    });
  };
  driver.map();
  console.log('donut');
  driver.geocoder = function() {
    uiGmapGoogleMapApi.then(function(map) {
      geocoder = new map.Geocoder();
      geocoder.geocode({"address": driver.start_loc}, function(res, status) {
        console.log(res);
        if(status === map.GeocoderStatus.OK) {
          var latLng = {
            latitude: res[0].geometry.location.lat(),
            longitude: res[0].geometry.location.lng()
          };
          driver.map.center = latLng;
        } else {
          alert("Geocode not working " + status);
        }
      });
    });
  };
  console.log('asshole');
  driver.get();
}]);
