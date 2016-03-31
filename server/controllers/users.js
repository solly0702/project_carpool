console.log("user_CTRL_connections");
var mongoose = require('mongoose');
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
    },
    getDriver: function(req, res){
      console.log("made to server ctrl", req.params.id);
      Users.findById(req.params.id)
      .populate('_carpool')
      .exec()
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    getRider: function(req, res){
      console.log("made to server ctrl", req.params.id);
      Users.findById(req.params.id)
      .populate('_carpool')
      .exec()
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    editDriver: function(req, res){
      console.log('made it to ctrl EDITEDITEDITEDITEDITEIDITETIDITEI', req.params.id);
      Users.findById(req.params.id).populate('_carpool'). exec(function(err, user){
        console.log(user);
        console.log(req.body);
        req.body.banana.name = req.body.name;
        req.body.banana._carpool.meeting_loc = req.body.meeting_loc;
        req.body.banana._carpool.end_loc = req.body.end_loc;
        req.body.banana._carpool.start_loc = req.body.start_loc;
        req.body.banana._carpool.capacity = req.body.capacity;
        req.body.banana._carpool.time_plan = req.body.time_plan;
      }).then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
  };
})();
