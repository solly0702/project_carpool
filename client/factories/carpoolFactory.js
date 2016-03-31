app.factory('carpoolFactory', ['$http', function($http){
  cF = {};

  cF.index = function(callback){
    // console.log('carpool factory start');
    $http.get('/users').then(function(data){
      callback(data);
      // console.log('carpool factory finish');
    })
  }


return cF;
}])
