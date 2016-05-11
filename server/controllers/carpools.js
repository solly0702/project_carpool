console.log("carpools_CTRL_connections");
var mongoose = require('mongoose');
var Carpools = mongoose.model("carpools");
var Users = mongoose.model("users");
var Join = mongoose.model("joins");

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
      Carpools.find({})
      .populate("_user")
      .populate("joins")
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    details: function(req, res) {
      console.log(req.params.id);
      Carpools.findById(req.params.id)
      .populate("_user")
      .populate({path: "joins", populate: {path: "_user"}})
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    create: function(req, res) {
     var carpool = new Carpools(req.body);
     carpool.save()
     .then(function(carpool_data) {
       Users.findById(carpool._user)
       .then(function(user_data) {
       user_data.carpools.push(carpool_data.id);
       console.log(user_data);
       user_data.save()
       .then(returnData.bind(res));
     });
     })
      .catch(err_catch.bind(res));
    },
    show: (function(req, res){
      Carpools.findById(req.params.id)
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    }),
    editDriver: function(req, res){
      Carpools.findById(req.params.id)
      .then(function(carpool_data) {
        carpool_data.update(req.body)
        .then(returnData.bind(res));
      })
      .catch(err_catch.bind(res));
    },
    delete: (function(req, res) {
      Carpools.findById(req.params.id).remove()
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    })
  };
})();
