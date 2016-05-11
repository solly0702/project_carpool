console.log("routes_connection");
//**********RESTful routes for users**********
// var mongoose = require('mongoose');
var Users = require("./../controllers/users.js");
var Carpools = require("./../controllers/carpools.js");
var Joins = require("./../controllers/joins.js");

module.exports = (function(app) {
  app.post('/login', Users.create);
  // app.get('/users', Users.index);
  app.put("/users/:id", Users.update);
  app.get('/rider/:id', Users.getRider);
  app.put('/editrider/:id', Users.editRider);
  app.get('/carpool', Carpools.index);
  app.get("/carpool/:id", Carpools.details);
  app.post("/carpool", Carpools.create);
  app.get('/driver/:id', Carpools.show);
  app.patch('/editdriver/:id', Carpools.editDriver);
  app.delete("/carpool/:id", Carpools.delete);
  app.get("/joins/:id", Joins.index);
  app.post('/joins', Joins.create);
  app.patch("/joins", Joins.delete);
  app.patch("/joins/:id", Joins.update);

  // app.put('/users/:id', Users.update);
  // app.delete('/users/:id', Users.delete);
});
//**********END routes for users**************
