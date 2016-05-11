var express = require('express');
var app = express();
var path = require('path');

//npm install body-parser --save
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

var server = app.listen(8000, function() {
  console.log("listening on port 8000");
});
