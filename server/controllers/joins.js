console.log("joins_CTRL_connections");
var mongoose = require('mongoose');
var Join = mongoose.model("joins");
var User = mongoose.model("users");
var Carpool = mongoose.model("carpools");

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
    index: function(req,res) {
      User.findById(req.params.id)
      .populate({path: "joins", populate: {path: "_carpool", populate: {path: "_user"}}})
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    create: function(req, res) {
      var join = new Join();
      join._user= req.body.user;
      join._carpool= req.body.carpool;
      join.save()
      .then(function(join_data) {
        User.findById(join_data._user)
        .then(function(user_data) {
          user_data.joins.push(join_data._id);
          console.log("@@@@user@@@@", user_data.joins);
          user_data.save();
        })
        .then(function(user_data){
          Carpool.findById(req.body.carpool)
          .then(function(carpool_data) {
            carpool_data.joins.push(join_data._id);
            carpool_data.capacity = carpool_data.capacity - req.body.size;
            console.log("@@@@carpool@@@@", carpool_data.joins);
            carpool_data.save()
            .then(returnData.bind(res));
          });
        });
      })
      .catch(err_catch.bind(res));
    },
    delete: function(req, res) {
      Join.remove({_id: req.body.join})
      .then(function(join_data) {
        Carpool.findById(req.body.carpool)
        .then(function(carpool_data){
          carpool_data.joins.pull(req.body.join);
          carpool_data.capacity = carpool_data.capacity + parseInt(req.body.size);
          carpool_data.save();
        });
      })
      .then(function(join_data) {
        User.findById(req.body.user)
        .then(function(user_data) {
          user_data.joins.pull(req.body.join);
          user_data.save();
        });
      })
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    },
    update: function(req, res) {
      Join.findById(req.params.id)
      .then(function (join_data) {
        if(join_data.status) {
        join_data.status = false;
        }
        else {
          join_data.status = true;
        }
        join_data.save();
        console.log(join_data);
      })
      .then(returnData.bind(res))
      .catch(err_catch.bind(res));
    }
  };
})();
