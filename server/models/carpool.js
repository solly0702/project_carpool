console.log("carpool_Model_connections");
//basic model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CarpoolSchema= new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "uses"
  },
  start_loc: {
    long: {
      type: Number,
      trim: true
    },
    lat: {
      type: Number,
      trim: true
    }
  },
  end_loc: {
    long: {
      type: Number,
      trim: true
    },
    lat: {
      type: Number,
      trim: true
    }
  },
  capacity: {
    type: Number,
    trim: true,
    max: [10, "Not more then 10"]
  },
  plan: {
    type: Date,
    trim: true,
    min: Date.now

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
