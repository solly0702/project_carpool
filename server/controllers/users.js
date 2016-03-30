console.log("user_CTRL_connections");
var mongoose = require('mongoose');
var Users = mongoose.model("users");

var returnData = function(data) {
  this.json(data);
};
var err_catch = function(err) {
    this.status(501);
    console.log("ERROR: " + err);
    return this.json(err);
};

module.exports=(function(app) {
  return {
    index: function(req, res) {
      Users.find({})
      .populate("_carpool")
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    create: function(req, res) {
      console.log("@@ in user_creation");
      var user = new Users(req.body)
      .save()
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    update: function(req,res){
      console.log('@@ in user_update');
      console.log(req.params);
      Users.findOne({_id:req.params.id}, function(err, user){
        console.log("++++++++++" + req.body.group_size, req.body.contact_info, req.body.time);
        console.log(user);
        user.group_size = req.body.group_size;
        user.contact_info = req.body.contact_info;
        user.time = req.body.time;
        user.save()
        .then(returnData.bind(res))
        .catch(err_catch.bind(res));
        console.log(user);

      });
    }
  };
})();
