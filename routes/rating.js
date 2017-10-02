"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const queries = require('./userqueries')(knex);
  //create a route to complete server side /api routes
  router.post("/rating", (req, res) => {

    var resourceId = req.body.resourceId;
    
    queries.getResourceRating(resourceId)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
