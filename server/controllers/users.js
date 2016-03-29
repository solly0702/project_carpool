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
      .populate({path:"users", populate: {path:"_carpool"}})
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    create: function(req, res) {
      console.log("@@ in user_creation");
      var user = new Users(req.body)
      .save()
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    }
  };
})();
