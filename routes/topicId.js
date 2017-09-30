"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('./userqueries');

module.exports = (knex) => {

<<<<<<< HEAD
  router.get("/:topicid", (req, res) => {
    queries.getResourcesByTopic(req.params.topicid)
=======
  router.get("/:topicId", (req, res) => {
    queries.getResourcesByTopic(req.params.topicId)
>>>>>>> routes
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
