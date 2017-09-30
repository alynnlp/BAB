"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const queries = require('./userqueries')(knex);
  //create a route to complete server side /api routes
  router.post("/users/:userId/likes", (req, res) => {
    //performing a function here to use the data's liked_resource table
    var userId = req.params.userId;
    //req.body.resourceId will look into the app.js where it matches the KEY value
    //in the data object under $.ajax call
    var resourceId = req.body.resourceId;
    queries.postLike(resourceId,userId)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
