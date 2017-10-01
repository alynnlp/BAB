"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const queries = require('./userqueries')(knex);
  router.post("/resources/:resourceid/delete", (req, res) => {
    var resourceId = req.params.resourceid;
    queries.deleteResource(resourceId)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
