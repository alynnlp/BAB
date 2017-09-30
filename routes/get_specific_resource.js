"use strict";
const express = require('express');
const router  = express.Router();
const userqueries = require('./userqueries');

module.exports = (knex) => {

  router.get("/resources/:resourceid", (req,res) => {
    getResource(req.params.resourceid)
      .then((results) => {
      res.json(results);
    });
    getResourceLikes(req.params.resourceid)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
      })
    getResourceRating(req.params.resourceid)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
      })
    getResourceComments(req.params.resourceid)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
      })
  });
  return router;
}
