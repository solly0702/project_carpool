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

// 1. express_server setup
// 2. main_server connects to server/config/routes.js
// 3. server/config/mongoose.js setup and connects to main_server
// 4. setup server/models/MODEL_NAME (SINGULAR IN MODEL, PLURALS IN CONTROLLERS )
// 5. setup controller connecting to DB and routes connects to controller
//    routes >> controllers >> DB
// 6. setup controller and connects to view and then routes
