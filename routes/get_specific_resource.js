"use strict";
const express = require('express');
const router  = express.Router();


module.exports = (knex) => {
const queries = require('./userqueries')(knex);

  router.get("/:resourceid", (req,res) => {
    queries.getResource(req.params.resourceid)
      .then((results) => {
      // console.log(results)
      res.json(results);
    });
    queries.getResourceLikes(req.params.resourceid)
      .then((results) => {
        // console.log(results)
        res.json(results);
      })
      .catch((err) => {
      })
    queries.getResourceRating(req.params.resourceid)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
      })
    queries.getResourceComments(req.params.resourceid)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
      })
  });
  return router;
}
