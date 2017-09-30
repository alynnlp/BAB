"use strict";

const express = require('express');
const router  = express.Router();
const queries = require('./userqueries');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    queries.getResourcesByTopic(2)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
