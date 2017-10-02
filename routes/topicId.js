"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const queries = require('./userqueries')(knex);

  router.get("/:topicId", (req, res) => {
    queries.getResourcesByTopic(req.params.topicId)
      .then((results) => {
        res.json(results);
    });
    
  });

  return router;
}
