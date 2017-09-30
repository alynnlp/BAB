"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const queries = require('./userqueries')(knex);
  //create a route to complete server side /api routes
  router.post("/register", (req, res) => {
    //performing a function here to use the data's liked_resource table

    //req.body.resourceId will look into the app.js where it matches the KEY value
    //in the data object under $.ajax call
    req.session.username = req.body.username;
    queries.createNewUser(
      req.body.firstName,
      req.body.surname,
      req.body.email,
      req.body.username,
      req.body.registerPassword
    ).then((results) => {
      res.json(results);
    });
    res.redirect("/users/:userid");
  });

  return router;

}
