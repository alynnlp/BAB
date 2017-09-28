"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

//******************************************FUNCTION***************************************************//

function checkforEmail(emailToCheck){
    for(user in users){
      if(users[user].email === emailToCheck){
        return true;
      }
    }
    return false;
}
function checkforUsername(usernameToCheck){
  for(user in users){
    if(users[user].username === usernameToCheck){
      return true;
    }
  }
  return false;
}
function checkforPassword(passwordToCheck){
  for (user in users){
    if(users[user].password === passwordToCheck){
      return true;
    }
  }
  return false;
}





//**********************************************GET******************************************************//
// Home page
app.get("/", (req, res) => {

  res.render("index", templateVars);
});

//users own page with liked sources and saved pins(customized topic)
app.get("/users/:userid",(req, res)=>{

  res.render("user", templateVars);
})

//account settings to update profile
app.get("/users/:userid/settings", (req,res)=>{

  res.render("account-settings", templateVars);
})

//Topic to browser after clicking the Discover Button
app.get("/discover", (req,res)=>{

  res.render("topics",templateVars);
})

//categorizing saved pins by adding new resources to customized topic
app.get("/users/:userid/adding", (req,res)=>{

  res.render("add-resource",templateVars);
})

//Resource page to show clicked individual page and comments 
app.get("/resources/:resourceid",(req,res)=>{

  res.render("resource",templateVars);
})


//**********************************************POST******************************************************//


//Home - Logged In
app.post("/", (req, res)=>{
  res.redirect("");
})

//Delete - users pins/ownpage
// /users/:userid/ - just user pins (GET, DELETE)
app.post("/users/:userid", (req,res)=>{
  res.redirect("");
})

//Update(PUT) users existing information
app.post("/users/:userid/settings", (req,res)=>{
  res.redirect("");
})

//Register
app.post("/register", (req,res)=>{
  res.redirect("");
})

//Login
app.post("/login",(req,res)=>{
  res.redirect("");
})

//Logout
app.post("/logout",(req,res)=>{
  res.redirect("");
})

//Resource - updating comment
app.post("/resource/:resourceid", (req,res)=>{
  res.redirect("");
})

//Resource - delete comment
app.post("/resources/:resourceid", (req,res)=>{
  res.redirect("");
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
