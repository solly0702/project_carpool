app.factory('carpoolFactory', ['$http', function($http){
  var carpoolFactory = {};

  carpoolFactory.index = function(callback){
    $http.get('/carpool').then(function(data){
      callback(data)
    });
  }
  carpoolFactory.create = function(callback){
    $http.post('/carpool').then(function(data){
      callback(data)
    });
  }
}])
