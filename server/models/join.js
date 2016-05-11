console.log("join_Model_connections");
//basic model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var JoinSchema= new mongoose.Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  _carpool: {
    type: Schema.Types.ObjectId,
    ref: 'carpools'
  },
  status: {
    type: Boolean,
    default: false
  }
  }, {timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
    }
  });

  mongoose.model("joins", JoinSchema);
