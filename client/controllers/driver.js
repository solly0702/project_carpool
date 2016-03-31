console.log("driver_CTRL");
<<<<<<< HEAD
app.controller("driverCtrl", ["$scope", "driverFactory", "$location", "$cookies", "uiGmapGoogleMapApi",function($scope, dF, $loc, $cookies, uiGmapGoogleMapApi) {
=======
app.controller("driverCtrl", ["$scope", "driverFactory", "$location", "$cookies", "$routeParams" ,function($scope, dF, $loc, $cookies, $routeParams) {
>>>>>>> 221bc7353394d6b85987013cd2d7d916ca304872

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
    });
  };


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



  driver.get = function(){
    console.log("start driver.get ctlr", id);
    dF.get(id, function(res){
      driver.banana = res.data;
      console.log(res.data);
    });
  };
  driver.get();

}]);
