app.factory('sessionFactory', ['$http', function($http){
  var userFactory={};
  var logged = {};

  userFactory.login = function(data, callback){
    $http.post('/login', data).then(funtion(data){
      logged = data.data;
      callback(data);
    }, function(data){
      console.log(data);
    });
  }
  userFactory.logout = function(){
    logged = {};
  }



  return userFactory;






}]);
