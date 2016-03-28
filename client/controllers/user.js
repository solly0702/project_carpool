app.controller('userController', ['$scope', 'userFactory', '$location', function($scope, uF, loc){
  console.log('userController');
  var _this = this;
  this.login = function(){
    uF.login(_this.user, function(data){
      if(!data.data.error){
        $loc.url('home');
        console.log(data.data);
      }
      this.error = data.data.error;
      console.log(this.error);
    })
  }


}])
