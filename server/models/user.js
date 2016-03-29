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
    type: Boolean,
    trim: true,
    required: true,
    default: true
  },
  group_size:{
    type: Number,
    trim: true,
    // required: true,
    min: 1
  },
  contact_info:{
    type: Number,
    minlength:10,
    // required: true,
    trim: true
  },
  time:{
    type: Date,
    trim: true,
    // required:true
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
