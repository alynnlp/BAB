"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('./userqueries');

module.exports = (knex) => {

  router.get("/:topicid", (req, res) => {
    queries.getResourcesByTopic(req.params.topicid)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
