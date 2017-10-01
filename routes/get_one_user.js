"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const queries = require('./userqueries')(knex);

  router.get("/:userid", (req, res) => {
    queries.individualUser(req.params.userid)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
