"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const queries = require('./userqueries')(knex);
  const bcrypt = require('bcrypt');
  //create a route to complete server side /api routes
  router.post("/register", (req, res) => {
    //performing a function here to use the data's liked_resource table
  const pass = req.body.register_password
  const hashedPass = bcrypt.hashSync(pass, 10)

    //req.body.resourceId will look into the app.js where it matches the KEY value
    //in the data object under $.ajax call
    knex('users')
      .where('users.username', '=', `${req.body.username}`)
      .select('id')
      .then(results => {
        if (results.length > 0){
          res.status(403).redirect("/")
        }
        else {
          queries.createNewUser(
            req.body.first_name,
            req.body.surname,
            req.body.email,
            req.body.username,
            hashedPass
          ).then((results) => {
            res.json(results);
          })
        req.session.username = req.body.username
        res.redirect("/");
        }
      })
  });

  return router;

}
