console.log("carpool_Model_connections");
//basic model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CarpoolSchema= new mongoose.Schema({

  _user: {
    type: Schema.Types.ObjectId,
    ref: "uses"
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
    trim: true,
    validate: {
      validator: function(time_plan) {
        if (time_plan > Date.now()) {
          return time_plan.test(time_plan);
        }
      },
      message: "{time_plan} is not available time"
    }

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
