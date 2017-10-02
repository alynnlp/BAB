"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) =>  {
  const bcrypt = require('bcrypt');
  //create a route to complete server side /api routes
  router.post("/login", (req, res) => {
    const username = req.body.username
    const pass = req.body.login_password
    console.log(req.body)

    knex('users')
      .where('username', '=', `${username}`)
      .select('password', 'id')
      .then(results => {
        // console.log(results[0].password)
        if (results.length <= 0) {
          res.status(403).redirect("/")
        }

        if (bcrypt.compareSync(pass, results[0].password)) {
          req.session.username = username
        }
      res.redirect('/')
      })
      .catch(err => {
        console.error(err)
      })
  });

  return router;

}
