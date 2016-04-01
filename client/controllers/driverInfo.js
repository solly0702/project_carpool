console.log("driver_Info_CTRL");

app.controller("driverInfoCtrl", ["$scope", "driverFactory", "$location", "$cookies", "$routeParams", "uiGmapGoogleMapApi","uiGmapIsReady",function($scope, dF, $loc, $cookies, $routeParams,uiGmapGoogleMapApi,uiGmapIsReady) {

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

  driver.get = function(){
    dF.get(id, function(res){
      loc.start_loc = res.data._carpool.start_loc;
      loc.end_loc = res.data._carpool.end_loc;
      loc.meeting_loc = res.data._carpool.meeting_loc;
      driver.banana = res.data;
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

  driver.code = function(loc,map, callback) {
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
        console.log(markerList);
      });
    });
  };

  // driver.dist_service = function() {
  //   uiGmapGoogleMapApi.then(function(map) {
  //     service = new map.DistanceMatrixService;
  //     console.log(driver.markerList);
  //     service.getDistanceMatrix({
  //       origins: [coords[0].coords, cords[1].coords],
  //       destinations: [coords[1].coords, cords[2].coords],
  //       travelMode: map.TravelMode.DRIVING,
  //       unitSystem: map.UnitSystem.METRIC,
  //       avoidHighways: false,
  //       avoidTolls: false
  //     }), function(res, status) {
  //       if(status !== map.DistanceMatrixStatus.OK) {
  //         alert("You should go by your self due to" + status);
  //       } else{
  //         console.log(res);
  //       }
  //     }
  //   });
  // };

  driver.get();

  uiGmapIsReady.promise()
    .then(driver.geocoder())
    .then(driver.map())
    // .then(driver.dist_service())
    .catch(function(err) {
      console.log(err);
  });




}]);
