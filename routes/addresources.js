"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const queries = require('./userqueries')(knex);
  //create a route to complete server side /api routes
  router.post("/addNewResource", (req, res) => {
    //req.body.resourceId will look into the app.js where it matches the KEY value
    //in the data object under $.ajax call
    req.session.username = req.body.username;
    queries.userPostResource(userPostResource(title, description, url, user_id, topic_id )
      req.body['resource-name'],
      req.body['resource-description'],
      req.body['resource-url'],
      req.body.req.session.userId,
      req.body.topicId
    ).then((results) => {
      res.json(results);
    });
    res.redirect("/users/:userid");
  });

  return router;

}
