"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const queries = require('./userqueries')(knex);
  router.get("/resources",(req,res)=>{
    //if (req.body['search-bar'] === ""){
      knex
      .select('*')
      .from("resources")
      .then((results)=>{
        // console.log(results)
        res.json(results);
      });
    // } else if (req.body['search-bar'] !== "") {
    //   queries.getResourceBySearch(req.body['search-bar'])
    //   .then((results) => {
    //     res.json(results);
    //   });
    // }
  });
  return router;
}
