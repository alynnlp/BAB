"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const queries = require('./userqueries')(knex);
  //create a route to complete server side /api routes
  router.post("/addnewresource", (req, res) => {
    //req.body.resourceId will look into the app.js where it matches the KEY value
    //in the data object under $.ajax call

    queries.userPostResource(
      req.body['resource-name'],
      req.body['resource-description'],
      req.body['resource-url'],
      req.session.userId,
      req.body['resource-topic'][0],
      req.body['img-url']
    )
    .then(results => {
      res.json(results);
    });
    res.redirect("/");
  });

  return router;

}
