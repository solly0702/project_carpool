app.controller('carpoolController', ['$scope', 'carpoolFactory', 'userFactory' '$location', function($scope, cF, uF, loc){
  console.log('carpoolController');
  var _this = this;
  this.user = uF.getUser();
  console.log(this.user);
  if (Object.keys(this.user).length == 0){
    log.url('/');
  }
  this.index = function(){cF.index(function(data){
    _this.users = data;
    console.log(_this.users);
    });
  }
  this.create = function(){cF.create(function(data){
    console.log(data);
  })}

}])
