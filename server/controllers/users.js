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
      .populate({ path: "carpools", populate: {path: "joins"}})
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    create: function(req, res) {
      Users.findOne({name: req.body.name})
      .then(function(user_data) {
         if (user_data) {
           user_data.status = req.body.status;
           user_data.save();
           return res.json(user_data);
         }
         else {
           var user = new Users(req.body)
           .save()
           .then(returnData.bind(res));
         }
      })
      .catch(err_catch.bind(res));
    },
    update: function(req,res){
      Users.findById(req.params.id)
      .then(function(user_data) {
        user_data.group_size = req.body.group_size;
        user_data.contact_info = req.body.contact_info;
        user_data.time = req.body.time;
        user_data.save()
        .then(returnData.bind(res));
        })
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
    editRider: function(req, res){
      Users.findById(req.params.id, function(err, user){
        user.group_size = req.body.group_size;
        user.contact_info = req.body.contact_info;
        user.time = req.body.time;
        user.save()
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
      });
    },
};
})();
