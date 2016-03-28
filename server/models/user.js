console.log("user_Model_connections");
//basic model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  _carpool: {
    type: Schema.Types.ObjectId,
    ref: "carpools"
  },
  }, {timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
    }
  });

mongoose.model("users", UserSchema);
