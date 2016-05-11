console.log("carpool_Model_connections");
//basic model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CarpoolSchema= new mongoose.Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  joins: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "joins"
    }],
    default: [],
  },
  start_loc: {
    type: String,
    trim: true
  },
  end_loc: {
    type: String,
    trim: true
  },
  capacity: {
    type: Number,
    trim: true,
    max: [10, "Not more then 10"]
  },
  time_plan: {
    type: Date,
    min: Date(new Date().toLocaleString()),
    trim: true,
  },
  meeting_loc: {
    type: String,
    trim: true
  }
  }, {timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
    }
  });

mongoose.model("carpools", CarpoolSchema);

CarpoolSchema.pre("remove", function(next) {
  this.model("users").update(
    {_id: {$in: this._user}},
    {$pull: {carpools: this._id}},
    {multi: true},
    next
  );
});
