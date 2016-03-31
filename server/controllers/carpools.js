console.log("CTRL_connections");
var mongoose = require('mongoose');
var Carpools = mongoose.model("carpools");
var Users = mongoose.model("users");

var returnData = function(data) {
  console.log(data);
  this.json(data);
};
var err_catch = function(err) {
    this.status(501);
    console.log("ERROR: " + err);
    return this.json(err);
};

module.exports=(function(app) {
  return {
    create: function(req, res) {
     var carpool = new Carpools(req.body)
     carpool.save()
     .then(function(carpool_data) {
       console.log("@carpool", carpool_data);
       Users.findById(req.body._user)
       .then(function(user_data) {
         user_data._carpool = carpool_data._id;
         user_data.save()
         .then(returnData.bind(res))
         .catch(err_catch.bind(res));
       });
     });
    }
  };
})();
