"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const queries = require('./userqueries')(knex);
  //create a route to complete server side /api routes
  router.post("/comment", (req, res) => {
    //req.body.resourceId will look into the app.js where it matches the KEY value
    //in the data object under $.ajax call
    queries.postComment(req.body['resource-id'],
    req.session.userId,
    req.body['resource-comment']
    )
    .then(results => {
      res.json(results);
    });
    res.redirect("/");
  });

  return router;

}
