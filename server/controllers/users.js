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
      Users.findOne({_id:req.params.id}, function(err, user){
        user.group_size = req.body.group_size;
        user.contact_info = req.body.contact_info;
        user.time = req.body.time;
        user.save()
        .then(returnData.bind(res))
        .catch(err_catch.bind(res));
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
      Users.findById(req.params.id).populate('_carpool').exec(function(err, user){
        user._carpool.meeting_loc = req.body.meeting_loc;
        user._carpool.end_loc = req.body.end_loc;
        user._carpool.start_loc = req.body.start_loc;
        user._carpool.capacity = req.body.capacity;
        user._carpool.time_plan = req.body.time_plan;
        user._carpool.save()
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    });
  },
  join: function(req, res) {
    Users.findById(req.params.id)
    .then(function(user_data) {
      console.log("@@",user_data);
      if (user_data.request) {
        user_data.request = false;
      } else {
        user_data.request = true;
      }
      user_data.save();
    })
    .then(returnData.bind(res))
    .catch(err_catch.bind(res));
  },
  aloow: function(req, res) {
    Users.findById(req.params.id)
    .then(function(user_data) {
      if (user_data.request) {
        user_data.allow = false;
      } else {
        user_data.allow = true;
      }
      user_data.save();
    })
    .then(returnData.bind(res))
    .catch(err_catch.bind(res));
  }
};
})();
