console.log("mongoose_Connection");
// require this file in the main server to load models
var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");

mongoose.connect("mongodb://localhost/carpool");

var models_path = path.join(__dirname, "/../models");
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf(".js") > 0) {
    require(models_path + "/" + file);
  }
});
